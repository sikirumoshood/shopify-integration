import config from '../../config';
import Utility from '../../utility';

class Order {
    constructor(params) {
        this.params = params;
        this.accessToken = this.params.accessToken;
        this.shop = this.params.shop;
        this.orderData = this.params.orderData;
    }

    /**
     * @description Returns full url to shopify orders api
     * @returns {string}
     */
    get orderBaseUrl () {
        return `https://${this.shop}.myshopify.com${config.ORDER_URL}`
    }

    /**
     * @description Creates order on shopify
     * @returns {void}
     */
    async save() {
        try{
           const resp = await Utility.callApi({
                url: this.orderBaseUrl,
                method: 'post',
                headers: { "X-Shopify-Access-Token": this.accessToken },
                body: { order: this.orderData }
            });

            if(resp.errors){
                throw new Error(resp.errors)
            }

        }catch(e){
            console.error('Failed to create order on shopify: ', e);
            throw(e)
        }
    }
}

export default Order;
