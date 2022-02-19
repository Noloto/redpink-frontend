## Getting Started

Install all the dependencies needed with `yarn` or `npm`

```bash
npm install
# or
yarn
```

After installing all the dependencies you can already run the development server:

```bash
npm run dev
# or
yarn dev
```

The Redpink Frontend is configured to run on [http://localhost:3000](http://localhost:3000).

## Shopify Storefront API

Follow the follwing steps to display the data given by the Storefront API in the Store

First create the file `.env.local` in the root folder
Create following environment variables with the value given by the Storefront API:

STOREFRONT_API_URL=<STOREFRONT_API_URL>
STOREFRONT_ACCESS_TOKEN=<STOREFRONT_ACCESS_TOKEN>
