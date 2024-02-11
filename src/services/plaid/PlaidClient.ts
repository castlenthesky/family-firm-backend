import config from "../../config";
import axios, { AxiosInstance } from "axios";

class PlaidClient {
  private client: AxiosInstance;
  private baseUrl: string;
  private clientId: string;
  private secret: string;

  constructor() {
    this.baseUrl = `https://${config.plaid.environment}.plaid.com`;
    this.clientId = config.plaid.client_id;
    this.secret = config.plaid.secret_key;

    this.client = axios.create({
      baseURL: this.baseUrl,
      headers: {
        "Content-Type": "application/json",
        // Additional headers here
      },
    });
  }

  private async makePostRequest(endpoint: string, body: object) {
    try {
      const data = {
        client_id: this.clientId,
        secret: this.secret,
        ...body,
      };
      const response = await this.client.post(endpoint, data);
      return response.data;
    } catch (error) {
      // Handle or throw error
      console.error("Error in POST request:", error);
      throw error;
    }
  }

  // Example: Method to create a link token
  public async createLinkToken(requestData: createLinkTokenBody) {
    const body = {
      client_name: "Vue Development Server",
      country_codes: ["US"],
      language: "en",
      ...requestData,
    };
    return await this.makePostRequest("/link/token/create", body);
  }

  public async exchangePublicToken(requestData: { public_token: string }) {
    return await this.makePostRequest(
      "/item/public_token/exchange",
      requestData,
    );
  }

  public async retrieveTransactions(requestData: {
    access_token: string;
    start_date: Date;
    end_date: Date;
  }) {
    return await this.makePostRequest("/transactions/get", requestData);
  }
}

type AllowedProducts = "auth" | "transactions" | "investments" | "liabilities";

interface createLinkTokenBody {
  products: AllowedProducts[];
  user: {
    client_user_id: string;
  };
  client_name?: string;
  country_codes?: string[];
  language?: string;
}

interface IretrieveBalanceBody {
  access_token: string;
}

export default PlaidClient;
