import config from "../config";
import { Router, Request, Response } from "express";
import plaid from "../services/plaid/PlaidClient";
import { CountryCode, Products } from "plaid";

// import publicRouter from './publicRouter'
// import adminRouter from './adminRouter'

const router: Router = Router();
// TODO: Setup public & admin routers
// router.use('/public', publicRouter)
// router.use('/admin', isAuthenticated, adminRouter )

router.get("/", (req: Request, res: Response) => {
  res.send(
    JSON.stringify({
      response: 200,
      message: "The Family-Firm server is up and running!",
    }),
  );
});

router.post("/auth/linktokencreate", async (req: Request, res: Response) => {
  try {
    const { user_id } = await req.body;
    const { data: link_token } = await plaid.linkTokenCreate({
      client_name: "Famliy Firm",
      language: "en",
      country_codes: [CountryCode.Us],
      user: { client_user_id: user_id },
      products: [Products.Transactions],
    });

    return res.send(JSON.stringify(link_token));
  } catch (error) {
    console.error("Error calling Plaid API:", error);
    return;
    // return res.status(500).send(error);
  }
});

router.post("/auth/exchangetoken", async (req: Request, res: Response) => {
  try {
    const { public_token } = req.body;
    const { data: access_token } = await plaid.itemPublicTokenExchange({
      public_token,
    });
    console.log(access_token);
    return res.send(JSON.stringify(access_token));
  } catch (error) {
    console.error("Error calling Plaid API:", error);
    return res.status(500).send(error);
  }
});

// router.post("/transactions", async (req: Request, res: Response) => {
//   try {
//     const { access_token, start_date, end_date } = req.body;
//     const plaidClient = new PlaidClient();
//     console.log(access_token, start_date, end_date);
//     const transactions = plaidClient.retrieveTransactions({
//       access_token,
//       start_date,
//       end_date,
//     });
//     return res.send(JSON.stringify(transactions));
//   } catch (error) {
//     console.error("Error calling Plaid API:", error);
//     return res.status(500).send(error);
//   }
// });

// Export the router
export default router;
