import config from '../../config';
import OrderData from './OrderData';
import Order from './Order';

class OrderSeeder {
  constructor() {
    this.count = 0;
    this.delayInterval = config.ORDER_DELAY_INTERVAL
  }

  /**
   * @description Delays request to shopify when rate limit has been met
   * @returns {void}
   */
  delay () {
    return new Promise(resolve => setTimeout(resolve, this.delayInterval));
  } 

  /**
   * @description Ensures the required arguments are provided to the script
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
   * @description Calls shopify endpont to create order
   * @returns {void}
   */
  async createOrder () {
    try{
      const { accessToken, shop } = this.returnArgs();
      const orderData = await new OrderData().create();
      const orderParams = { accessToken, shop, orderData }
      await new Order(orderParams).save();
      ++this.count;
      console.log(`:::: TOTAL ORDERS CREATED: [${this.count}] ::::\n`)
    }catch(e) {
      console.error('::: FAILED TO CREATE ORDER FROM SCRIPT, RETRYING AFTER 1 MINUTE...', e);
      await this.delay()
    }
  }

  /**
   * @description Runs script
   * @returns {void}
   */
  async run() {
    try{
      this.validateArgs();
      
      const { shop } = this.returnArgs();

      console.log(`Creating ${config.NO_OF_ORDERS} orders for store: ${shop}...`);

      while(this.count < config.NO_OF_ORDERS) {
         await this.createOrder();
      }
      
      console.log(`Finished creating orders`);

    }catch(e){
      console.error('Failed to seed orders: ', e);
      throw (e);
    }
  }
}

new OrderSeeder().run();
