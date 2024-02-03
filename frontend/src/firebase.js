// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZu_t4QNafqiLuP0vALorkM9xVSvsjU0o",
  authDomain: "nutrition-app-2da2b.firebaseapp.com",
  projectId: "nutrition-app-2da2b",
  storageBucket: "nutrition-app-2da2b.appspot.com",
  messagingSenderId: "346140064955",
  appId: "1:346140064955:web:96d224adbec5456ef5bd9e",
  measurementId: "G-13NQ7JTT0W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;