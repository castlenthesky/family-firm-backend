import * as dotenv from "dotenv";

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envConfig = dotenv.config();

if (!envConfig) {
  throw new Error("Unable to find .env file.");
}

export default {
  app: {
    url: process.env.APP_URL || "localhost",
    port: process.env.APP_PORT || 4000,
  },
  firebase: {
    options: {
      apiKey: process.env.FIREBASE_API_KEY || "YOUR_API_KEY",
      authDomain: process.env.FIREBASE_AUTH_DOMAIN || "YOUR_AUTH_DOMAIN",
      projectId: process.env.FIREBASE_PROJECT_ID || "YOUR_PROJECT_ID",
      storageBucket:
        process.env.FIREBASE_STORAGE_BUCKET || "YOUR_STORAGE_BUCKET",
      messagingSenderId:
        process.env.FIREBASE_MESSAGING_SENDER_ID || "YOUR_MESSAGING_SENDER_ID",
      appId: process.env.FIREBASE_APP_ID || "YOUR_APP_ID",
      measurementId:
        process.env.FIREBASE_MEASUREMENT_ID || "YOUR_MEASUREMENT_ID",
      databaseURL: process.env.FIREBASE_DATABASE_URL || "YOUR_DATABASE_URL",
    },
  },
  plaid: {
    client_id: process.env.PLAID_CLIENT_ID || "YOUR_PLAID_CLIENT_ID",
    secret_key: process.env.PLAID_SECRET_KEY || "SHOULD NOT STORE HERE",
    environment: process.env.PLAID_ENVIRONMENT || "sandbox",
    access_token: process.env.PLAID_ACCESS_TOKEN || "SHOULD NOT STORE HERE",
  },
};
