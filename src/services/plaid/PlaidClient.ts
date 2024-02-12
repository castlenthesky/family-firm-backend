import config from "../../config";
import {
  AccountsGetRequest,
  Configuration,
  CountryCode,
  InvestmentsHoldingsGetRequest,
  ItemPublicTokenExchangeRequest,
  PlaidApi,
  PlaidEnvironments,
  Products,
  TransactionsSyncRequest,
} from "plaid";

const plaid_configuration = new Configuration({
  basePath: PlaidEnvironments.development,
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": config.plaid.client_id,
      "PLAID-SECRET": config.plaid.secret_key,
    },
  },
});

class PlaidClient extends PlaidApi {
  public static instance: PlaidApi;

  // Initialize a link token for the appropriate products
  public async link_token_create(user_id: string) {
    PlaidClient.getInstance();
    PlaidClient.instance.linkTokenCreate({
      client_name: "Famliy Firm",
      language: "en",
      country_codes: [CountryCode.Us],
      user: { client_user_id: user_id },
      products: [Products.Balance],
      required_if_supported_products: [
        Products.Auth,
        Products.Transactions,
        Products.Investments,
        Products.Liabilities,
        Products.Assets,
      ],
    });
  }

  public async item_public_token_exchange(
    request: ItemPublicTokenExchangeRequest,
  ) {
    PlaidClient.instance.itemPublicTokenExchange(request);
  }

  // Get accounts linked to access token
  public async getAccounts(request: AccountsGetRequest) {
    return PlaidClient.instance.accountsGet(request);
  }

  public async transactions_sync(request: TransactionsSyncRequest) {
    PlaidClient.instance.transactionsSync(request);
  }

  public async assets_get(request: InvestmentsHoldingsGetRequest) {
    PlaidClient.getInstance();
    PlaidClient.instance.investmentsHoldingsGet(request);
  }

  // The static method that controls access to the singleton instance.
  public static getInstance(): PlaidApi {
    if (!PlaidClient.instance) {
      PlaidClient.instance = new PlaidApi(plaid_configuration);
    }
    return PlaidClient.instance;
  }
}

const plaid = PlaidClient.getInstance();
export default plaid;
