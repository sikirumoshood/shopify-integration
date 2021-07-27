class DataSchema {
  constructor(params){
    this.params = params;
  }

  /**
   * @description Sample order data
   * @returns {object}
   */
  get schema () {
    return {
      fulfillment_status: null,
      line_items: [
        {
          fulfillable_quantity: 1,
          fulfillment_service: 'amazon',
          fulfillment_status: 'fulfilled',
          grams: 500,
          id: 669751112,
          price: '199.99',
          product_id: 6892607897752,
          quantity: 1,
          requires_shipping: true,
          sku: 'IPOD-342-N',
          title: 'IPod Nano',
          variant_title: 'Pink',
          vendor: 'Apple',
          name: 'Eye wear - nano',
          gift_card: false,
          price_set: {
            shop_money: {
              amount: '199.99',
              currency_code: 'USD'
            },
            presentment_money: {
              amount: '173.30',
              currency_code: 'EUR'
            }
          },
          properties: [
            {
              name: 'custom engraving',
              value: 'Happy Birthday Mom!'
            }
          ],
          taxable: true,
          tax_lines: [
            {
              title: 'HST',
              price: '25.81',
              price_set: {
                shop_money: {
                  amount: '25.81',
                  currency_code: 'USD'
                },
                presentment_money: {
                  amount: '20.15',
                  currency_code: 'EUR'
                }
              },
              rate: 0.13
            }
          ],
          total_discount: '5.00',
          total_discount_set: {
            shop_money: {
              amount: '5.00',
              currency_code: 'USD'
            },
            presentment_money: {
              amount: '4.30',
              currency_code: 'EUR'
            }
          },
          discount_allocations: [
            {
              amount: '5.00',
              discount_application_index: 2,
              amount_set: {
                shop_money: {
                  amount: '5.00',
                  currency_code: 'USD'
                },
                presentment_money: {
                  amount: '3.96',
                  currency_code: 'EUR'
                }
              }
            }
          ],
          origin_location: {
            id: 1390592786454,
            country_code: 'CA',
            province_code: 'ON',
            name: 'Apple',
            address1: '700 West Georgia Street',
            address2: '1500',
            city: 'Toronto',
            zip: 'V7Y 1G5'
          },
          duties: [
            {
              id: '2',
              harmonized_system_code: '520300',
              country_code_of_origin: 'CA',
              shop_money: {
                amount: '164.86',
                currency_code: 'CAD'
              },
              presentment_money: {
                amount: '105.31',
                currency_code: 'EUR'
              },
              tax_lines: [
                {
                  title: 'VAT',
                  price: '16.486',
                  rate: 0.1,
                  price_set: {
                    shop_money: {
                      amount: '16.486',
                      currency_code: 'CAD'
                    },
                    presentment_money: {
                      amount: '10.531',
                      currency_code: 'EUR'
                    }
                  }
                }
              ],
              admin_graphql_api_id: 'gid://shopify/Duty/2'
            }
          ]
        }
      ],
      customer: {
        first_name: 'Paul',
        last_name: 'Norman',
        email: 'paul.norman@example.com'
      },
      billing_address: {
        first_name: 'John',
        last_name: 'Smith',
        address1: '123 Fake Street',
        phone: '555-555-5555',
        city: 'Fakecity',
        province: 'Ontario',
        country: 'Canada',
        zip: 'K2P 1L4'
      },
      shipping_address: {
        first_name: 'Jane',
        last_name: 'Smith',
        address1: '123 Fake Street',
        phone: '777-777-7777',
        city: 'Fakecity',
        province: 'Ontario',
        country: 'Canada',
        zip: 'K2P 1L4'
      },
      email: 'jane@example.com',
      transactions: [
        {
          kind: 'authorization',
          status: 'success',
          amount: 50.0
        }
      ],
      financial_status: 'partially_paid'
    };
  }

  get() {
    const { customer = null, billing_address = null, email = null, shipping_address = null } = this.params;
    
    const newSchema = this.schema;

    if (customer) {
      newSchema.customer = customer;
    }

    if(billing_address){
      newSchema.billing_address = billing_address;
    }

    if(shipping_address){
      newSchema.shipping_address = shipping_address;
    }

    if(email){
      newSchema.email = email;
    }

    return newSchema;
  }
}

export default DataSchema;
