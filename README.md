### Shopify Integration Scripts
- Script to create orders on shopify
- Script to fetch orders from shopify

### How To Run 
Ensure you have the ```access_token``` and ```store_name``` available.

> You can temporarily use mine to test, check the config for the access_token and store/shop name

- Install dependencies
Run the following command in your terminal:
> npm install

- Quick Test
Edit config by setting smaller values for ```NO_OF_ORDERS``` and ```ORDER_FETCH_LIMIT```
To quickly test basic functionality.

- Create orders on shopify
Run the following command to create orders on shopify:
> npm run seed-orders <access_token> <store_name>

Real sample:
> npm run seed-orders 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 latudestore

- Fetch orders on shopify
Run the following command to fetch orders on shopify:
> npm run fetch-orders <access_token> <store_name>

Real sample:
> npm run fetch-orders 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 latudestore


