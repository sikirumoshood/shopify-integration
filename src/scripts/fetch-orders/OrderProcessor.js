import config from '../../config';
import OrderFetcher from './OrderFetcher';

class OrderProcessor {
  constructor() {
    this.count = 0;
    this.delayInterval = config.ORDER_DELAY_INTERVAL;
    this.fetchOrders = true;
  }

  /**
   * @description Delays request to shopify due to api rate limit
   * @returns {Promise}
   */
  delay () {
    return new Promise(resolve => setTimeout(resolve, this.delayInterval));
  } 

  /**
   * @description Ensures the required arguments are provided when running the script
   * @returns {void}
   */
  validateArgs() {
    const accessToken = process.argv[2];
    const shop = process.argv[3];

    if(!accessToken){
      console.error('Access token not provided.');
      throw new Error('Access token is required!');
    }

    if(!shop){
      console.error('Shop name must be provided');
      throw new Error('Shop is required');
    }
  }

  /**
   * @description Extracts the arguments passed to the script and return as object
   * @returns {object}
   */
  returnArgs() {
    const scriptArgs = {
      accessToken: process.argv[2],
      shop: process.argv[3]
    }

    return scriptArgs;
  }

  /**
   * @description Fetches all orders from shopify and exports to csv
   * @returns {void}
   */
  async processOrders () {
    try{
      const { accessToken, shop } = this.returnArgs();

      const orderFetcherParams = { 
          accessToken, 
          shop, 
          limit: config.ORDER_FETCH_LIMIT, 
          sortKey: config.ORDER_SORT_KEY,
          orderFields: config.ORDER_FIELDS
        };

      if(!this.orderFetcher) {
        this.orderFetcher =  new OrderFetcher(orderFetcherParams);
      }

      const orderData = await this.orderFetcher.fetch();
      console.log('::: ORDERS FETCHED ....', orderData.length)
      
      if(orderData.length === 0) {
        // Stop fetching orders
        this.fetchOrders = false;
        return
      }

      this.count += orderData.length;

      // Export
      this.orderFetcher.exportAsCsv(orderData);

    }catch(e) {
      console.error('FAILED TO FETCH ORDER FROM SCRIPT, WILL RETRY AFTER 1 MINUTE', e);
      await this.delay()
    }
    
  }

  /**
   * @description Runs the script
   * @returns {void}
   */
  async run() {
    try{
      this.validateArgs();
      
      const { shop } = this.returnArgs();

      console.log(`Fetching all orders for store: ${shop}...`);

      while(this.fetchOrders) {
         await this.processOrders()
      }
      
      const csvPath = this.orderFetcher.csvPath;
      console.log(`Finished fetching [${this.count}] orders. Here is the path to the CSV [${csvPath}]`);

    }catch(e){
      console.error('Failed to fetch orders: ', e);
      throw (e);
    }
  }
}

new OrderProcessor().run();
