import app from "firebase/app"
import auth from "firebase/auth"
import firestore from "firebase/firestore"

export const isBrowser = () => typeof window !== "undefined"

let firebase = null

export const credentials = {
  apiKey: process.env.GATSBY_FIREBASE_API_KEY,
  authDomain: process.env.GATSBY_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.GATSBY_FIREBASE_PROJECT_ID,
  storageBucket: process.env.GATSBY_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.GATSBY_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.GATSBY_FIREBASE_APP_ID,
}

export function getFirebase() {
  // Make sure to init Firebase only once
  if (isBrowser() && !firebase) {
    firebase = app.initializeApp(credentials)
  }
  return firebase
}
