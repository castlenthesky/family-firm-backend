import config from "../../config";

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseApp = initializeApp(config.firebase.options);
const firebaseAuth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export default class FirebaseClient {
  private static instance: FirebaseClient;

  // Make the constructor private to prevent direct construction calls with the `new` operator.
  private constructor() {}

  // The static method that controls access to the singleton instance.
  public static getInstance(): FirebaseClient {
    if (!FirebaseClient.instance) {
      FirebaseClient.instance = new FirebaseClient();
    }
    return FirebaseClient.instance;
  }

  // Method to write an object to a specified collection
  async writeToCollection(collectionName: string, data: object): Promise<void> {
    try {
      const docRef = await addDoc(collection(db, collectionName), data);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
}

export { firebaseApp, firebaseAuth, db };
