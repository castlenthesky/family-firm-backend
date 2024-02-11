import axios from "axios";
import { Router, Request, Response } from "express";
import config from "../config";
import PlaidClient from "../services/plaid/PlaidClient";

const public_router: Router = Router();

public_router.get("/", (req: Request, res: Response) => {
  res.send(
    JSON.stringify({
      response: 200,
      message: "The Family-Firm server is up and running!",
    }),
  );
});

public_router.post(
  "/link/token/create",
  async (req: Request, res: Response) => {
    try {
      // TODO: Parse information from request to submit to Plaid
      const data = await req.body;
      const plaidClient = new PlaidClient();
      const plaidResponse = await plaidClient.createLinkToken({
        products: data.products,
        user: {
          client_user_id: data.user.client_user_id,
        },
      });
      return res.send(JSON.stringify(plaidResponse));
    } catch (error) {
      console.error("Error calling Plaid API:", error);
      return res.status(500).send(error);
    }
  },
);

public_router.get(
  "/item/public_token/exchange",
  async (req: Request, res: Response) => {
    try {
      const reqPublicToken = req.body.public_token;
      const plaidClient = new PlaidClient();
      const plaidResponse = await plaidClient.exchangePublicToken({
        public_token: reqPublicToken,
      });
      return res.send(JSON.stringify(plaidResponse));
    } catch (error) {
      console.error("Error calling Plaid API:", error);
      return res.status(500).send(error);
    }
  },
);

// Export the router
export default public_router;
