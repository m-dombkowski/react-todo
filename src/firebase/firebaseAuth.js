import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Initialize Firebase
const app = initializeApp({
  apiKey: "AIzaSyANtqX3Il0NT6aX_evLDLh0kF1Czp8nSvQ",
  authDomain: "todo-react-21854.firebaseapp.com",
  databaseURL:
    "https://todo-react-21854-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "todo-react-21854",
  storageBucket: "todo-react-21854.appspot.com",
  messagingSenderId: "127403745839",
  appId: "1:127403745839:web:e1e4b69c3da70884a9dcda",
  measurementId: "G-DV8KQHFZN8",
});

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const url = app._options.databaseURL;

// const AXIOS_INSTANCE = axios.create({
//   baseURL: "https://some-domain.com/api/",
//   timeout: 1000,
//   headers: { "X-Custom-Header": "foobar" },
// });
