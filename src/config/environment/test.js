const test = {
  ENVIRONMENT: 'test',
  RANDOM_USER_URL: 'https://randomuser.me/api/',
  SHOP: "latudestore",
  ACCESS_TOKEN: "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", // Test token for my sample store
  ORDER_URL: '/admin/api/2021-07/orders.json',
  NO_OF_ORDERS: 2,
  ORDER_DELAY_INTERVAL: 60000,
  ORDER_FETCH_LIMIT: 20,
  ORDER_SORT_KEY: 'created_at',
  ORDER_FIELDS: [
    'id', 
    'cancelled_at', 
    'closed_at', 
    'created_at', 
    'financial_status', 
    'fulfillment_status', 
    'gateway', 
    'name', 
    'number', 
    'order_number', 
    'processed_at', 
    'processing_method', 
    'source_name', 
    'subtotal_price', 
    'total_discounts', 
    'total_line_items_price', 
    'total_price', 
    'total_tax'
  ]
};

export default test;
