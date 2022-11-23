// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCmafYA0ogxcMykPGnWULMMoh5_OChX_Rc",
    authDomain: "todolist-1fce4.firebaseapp.com",
    projectId: "todolist-1fce4",
    storageBucket: "todolist-1fce4.appspot.com",
    messagingSenderId: "980971394648",
    appId: "1:980971394648:web:406a43cdc43c6093879c2d"
};

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);