import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCQpIM4869O_0yf_e0EZelAQSx7i5LRqNg",
  authDomain: "build-a-pomodro-timer-ap-f1f16.firebaseapp.com",
  projectId: "build-a-pomodro-timer-ap-f1f16",
  storageBucket: "build-a-pomodro-timer-ap-f1f16.appspot.com",
  messagingSenderId: "132616002893",
  appId: "1:132616002893:web:0be5d3ced56e6b1aba2b04",
  measurementId: "G-G9VQRNTSX4",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
