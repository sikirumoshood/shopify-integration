import config from '../../config';
import Utility from '../../utility';
import obj from 'object-path';
import DataSchema from './DataSchema';

class OrderData {
  constructor() {}

  /**
   * @description Extracts basic customer info from random user data
   * @param {object} userData 
   * @returns {object}
   */
  extractCustomerFrom (userData) {
    const userDataObject = obj(userData);
    return {
        first_name: userDataObject.get('name.first'),
        last_name: userDataObject.get('name.last'),
        email: userDataObject.get('email')
    }
  }

  /**
   * @description Extracts basic billing info from random user data 
   * @param {object} userData 
   * @returns {object}
   */
  extractBillingInfoFrom (userData) {
    const userDataObject = obj(userData);
    return {
        first_name: userDataObject.get('name.first'),
        last_name: userDataObject.get('name.last'),
        address1: `${userDataObject.get('location.street.number')}${userDataObject.get('location.street.name')}`,
        phone: userDataObject.get('cell'),
        city: userDataObject.get('location.city'),
        province: 'Ontario',
        country: userDataObject.get('location.country'),
        zip: 'K2P 1L4'
    }
  }

  /**
   * @description Extracts shipping info from random user data 
   * @param {object} userData 
   * @returns {object}
   */
   buildShippingInfoFrom (userData) {
      const userDataObject = obj(userData);
      return {
          first_name: userDataObject.get('name.first'),
          last_name: userDataObject.get('name.last'),
          address1: `${userDataObject.get('location.street.number')}${userDataObject.get('location.street.name')}`,
          phone: userDataObject.get('cell'),
          city: userDataObject.get('location.city'),
          province: 'Ontario',
          country: userDataObject.get('location.country'),
          zip: 'K2P 1L4'
      }
    }

  /**
   * @description Ensures the required fields are provided
   * @returns {void}
   */
  validateOptions() {
    if (!this.options.params) {
      throw new Error('params field is required');
    }
  }

  /**
   * @description Fetches a random user info from a remote api
   * @returns {object}
   */
  async getRandomUserData() {
    try{
      const userData = await Utility.callApi({
        url: config.RANDOM_USER_URL,
        method: 'get'
      });
  
      return userData;
    }catch(e) {
      console.log('Failed to fetch random user: ', e);
      throw(e)
    }
  }

  /**
   * @description Creates a sample order object for shopify
   * @returns {object}
   */
  async create() {
    try {
      const userResult = await this.getRandomUserData();
      const user = userResult.results[0]
      const customer = this.extractCustomerFrom(user);
      const billing_address = this.extractBillingInfoFrom(user);
      const email = user.email;
      const shipping_address = this.buildShippingInfoFrom(user);
      const schemaParams = { customer, billing_address, email, shipping_address };
      const orderData = new DataSchema(schemaParams).get();
      return orderData

    } catch (e) {
      console.error('Failed to create order data: ', e)
      throw (e)
    }
  }
}

export default OrderData;
