import config from "./config";
import express from "express";
import router from "./routes";
import * as middlewares from "./middlewares";
import * as utilities from "./utilities";

// Create a new express application instance
const app: express.Application = express();

// Attach middlewares
app.use(express.json());
app.use(middlewares.requestTimeLogger);

// Use the router
app.use("/api", router);

// Start the Express server
app.listen(config.app.port, () => {
  console.log(
    `Server is running at http://${config.app.url}:${config.app.port}/api`,
  );
});

// import { Configuration, PlaidApi, PlaidEnvironments } from "plaid";

// const configuration = new Configuration({
//   basePath: PlaidEnvironments.development,
//   baseOptions: {
//     headers: {
//       "PLAID-CLIENT-ID": config.plaid.client_id,
//       "PLAID-SECRET": config.plaid.secret_key,
//       // 'Plaid-Version': '2020-09-14',
//     },
//   },
// });

// export async function getAccounts() {
//   const plaidClient = new PlaidApi(configuration);

//   const accounts = await plaidClient.accountsGet({
//     access_token: "test_token_here",
//   });

//   utilities.writeObjectToJsonFile("accountData.json", accounts.data);
//   console.log(accounts.data);
// }

// getAccounts();
