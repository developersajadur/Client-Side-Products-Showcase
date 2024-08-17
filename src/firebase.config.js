// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBp5dwDXqZLkQ4mU0wYENdRicGke2DRSjg",
  authDomain: "productsshowcase-991cd.firebaseapp.com",
  projectId: "productsshowcase-991cd",
  storageBucket: "productsshowcase-991cd.appspot.com",
  messagingSenderId: "304980615167",
  appId: "1:304980615167:web:d2daea330559b9fb7451ca"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth