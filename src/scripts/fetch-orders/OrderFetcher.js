import config from '../../config';
import Utility from '../../utility';
import CsvBuilder from './CsvBuilder';
import LinkProcessor from './LinkProcessor';
import OrderFormatter from './OrderFormatter';

class OrderFetcher {
    constructor(params) {
        this.params = params;
        this.shop = params.shop;
        this.accessToken = params.accessToken
        this.limit = params.limit;
        this.sortKey = params.sortKey;
        this.paginationUrlInfo = { previous: null, next: null };
        this.orderFields = params.orderFields;
        this.firstTimeFetch = true;
    }

    /**
     * @description Builds the complete url for fetching orders from the store
     * @returns {string}
     */
    get orderBaseUrl() {
        return `https://${this.shop}.myshopify.com${config.ORDER_URL}?status=any&limit=${this.limit}&order=${this.sortKey} asc`;
    }

    /**
     * @description Updates the pagination information so the fetcher know when to stop fetching 
     * when next is null for instance
     * @param {object} responseHeaders 
     */
    updatePaginationInfo (responseHeaders) {
        const linkProcessorParams = { headers: responseHeaders };
        
        if(!this.linkProcessor) {
            this.linkProcessor = new LinkProcessor(linkProcessorParams);
        }else{
            this.linkProcessor.headers = responseHeaders;
        }

        this.paginationUrlInfo = this.linkProcessor.getPaginationUrls();
    }

    /**
     * @description Determines the next url to be  used for pulling data from shopify
     * @returns {string}
     */
    getNextFetchUrl() {
        let url = null;

        if(this.firstTimeFetch){
            url = this.orderBaseUrl;
            this.firstTimeFetch = false;
        }

        if(!this.firstTimeFetch && this.paginationUrlInfo.next) {
            url = this.paginationUrlInfo.next;
        }

        return url;
    }

    /**
     * @description Exports data fetched to a csv file
     * @param {array} data 
     */
    exportAsCsv (data) {
        if(!this.csvBuilder){
            const csvBuilderParams = { newlineSeparator: '\r\n', fileName: 'orders.csv', fields: this.orderFields };
            this.csvBuilder = new CsvBuilder(csvBuilderParams);
        }

        // Creates or appends to existing csv file
        this.csvBuilder.write(data);
        this.csvPath = this.csvBuilder.filePath;
    }

    /**
     * @description Fetches orders from shopify and return them containing only the expected fields
     * @returns {array}
     */
    async fetch() {
        try{
            const url = this.getNextFetchUrl();

            if(!url) {
                return []
            }

            const { data: orderResult, headers: responseHeaders }  = await Utility.callApiWithHeaderResponse({
                url,
                method: 'get',
                headers: { "X-Shopify-Access-Token": this.accessToken }
            });

            if(orderResult.errors) {
                throw new Error(orders.errors);
            }

            const { orders } = orderResult;

            // Format orders to only contain required fields
            const formatParams = { fields: this.orderFields, orders };
            const formattedOrders = new OrderFormatter(formatParams).getFormattedOrders();
            this.updatePaginationInfo(responseHeaders);
            return formattedOrders;

        }catch(e){
            console.log('Failed to retrieve orders: ', e);
            throw (e)
        }
    }
}

export default OrderFetcher;
