import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: ProcessingInstruction.env.API_KEY,
  authDomain: "blog-ec59b.firebaseapp.com",
  projectId: "blog-ec59b",
  storageBucket: "blog-ec59b.appspot.com",
  messagingSenderId: "220801588480",
  appId: "1:220801588480:web:bef0650693af014be9a7e5"
};
const app = initializeApp(firebaseConfig)
export default app;