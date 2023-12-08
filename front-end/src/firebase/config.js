// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCM9piGYxJql6SUP5arZY_10oR0wI8yIKc",
    authDomain: "everest-8bdda.firebaseapp.com",
    projectId: "everest-8bdda",
    storageBucket: "everest-8bdda.appspot.com",
    messagingSenderId: "441385359114",
    appId: "1:441385359114:web:b345fa818e2d90696f4cf3",
    measurementId: "G-N3Z25FE1WW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const imageStorage = getStorage(app)
export default imageStorage