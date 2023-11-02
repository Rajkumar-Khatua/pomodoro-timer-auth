import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoadingEmail, setIsLoadingEmail] = useState(false); // Loading state for email login
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false); // Loading state for Google login

  const navigate = useNavigate();

  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const signInWithEmail = () => {
    setIsLoadingEmail(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential.user);
      })
      .catch((error) => {
        console.log(error.message);
      })
      .finally(() => {
        setIsLoadingEmail(false);
      });
  };

  const signInWithGoogle = () => {
    setIsLoadingGoogle(true);

    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result.user);
        toast("User has successfully logged in");
        setTimeout(() => {
          navigate("/"); // Redirect to home page after 3 seconds
        }, 3000);
      })
      .catch((error) => {
        console.log(error.message);
      })
      .finally(() => {
        setIsLoadingGoogle(false);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-white p-6 sm:p-10 rounded-lg shadow-2xl w-full sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4">
        <h2 className="text-3xl font-bold mb-10 text-gray-800">
          Login to your account
        </h2>
        <input
          type="text"
          className="border w-full p-2 mb-3 rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="border w-full p-2 mb-3 rounded"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={signInWithEmail}
          className={`w-full bg-blue-600 text-white font-bold p-2 rounded relative ${
            isLoadingEmail ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isLoadingEmail}
        >
          {isLoadingEmail ? (
            <div className="w-6 h-6 border-t-2 border-b-2 border-blue-100 border-r-2 border-blue-400 rounded-full animate-spin absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
          ) : (
            "Sign In with Email"
          )}
        </button>
        <button
          onClick={signInWithGoogle}
          className={`w-full bg-red-600 text-white font-bold p-2 rounded mt-4 relative ${
            isLoadingGoogle ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isLoadingGoogle}
        >
          {isLoadingGoogle ? (
            <div className="w-6 h-6 border-t-2 border-b-2 border-red-100 border-r-2 border-red-400 rounded-full animate-spin absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
          ) : (
            "Sign In with Google"
          )}
        </button>
        <Link
          to="/register"
          className="text-center mt-4 text-blue-500 hover:text-blue-700"
        >
          Don't have an account? Register
        </Link>
      </div>
    </div>
  );
}

export default Login;
