import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "YOUR FIREBASE API KEY",
  authDomain: "inbox-d9304.firebaseapp.com",
  projectId: "inbox-d9304",
  storageBucket: "inbox-d9304.firebasestorage.app",
  messagingSenderId: "3578145077",
  appId: "1:3578145077:web:82dcfbb53b7540cff7447c"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export default app