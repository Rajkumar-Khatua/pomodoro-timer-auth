import React, { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoadingEmail, setIsLoadingEmail] = useState(false); // Loading state for email registration
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false); // Loading state for Google registration

  const navigate = useNavigate();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const registerWithEmail = () => {
    setIsLoadingEmail(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        updateProfile(userCredential.user, {
          displayName: name,
        }).then(() => {
          toast("User has successfully registered");
          setTimeout(() => {
            setIsLoadingEmail(false);
            navigate("/");
          }, 3000);
        });
      })
      .catch((error) => {
        setIsLoadingEmail(false);
        console.log(error.message);
      });
  };

  const signInWithGoogle = () => {
    setIsLoadingGoogle(true);

    signInWithPopup(auth, provider)
      .then((result) => {
        toast("User has successfully registered");
        setTimeout(() => {
          setIsLoadingGoogle(false);
          navigate("/");
        }, 3000);
      })
      .catch((error) => {
        setIsLoadingGoogle(false);
        console.log(error.message);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-400">
      <div className="bg-white p-6 sm:p-10 rounded shadow-2xl w-full sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4">
        <h2 className="text-3xl font-bold mb-4 text-gray-800 text-center">
          Create your account
        </h2>
        <input
          type="text"
          className="border w-full p-2 mb-3 rounded"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
          onClick={registerWithEmail}
          className={`w-full bg-blue-600 text-white font-bold p-2 rounded relative ${isLoadingEmail ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isLoadingEmail}
        >
          {isLoadingEmail ? (
            <div className="w-6 h-6 border-t-2 border-b-2 border-blue-100 border-r-2 border-blue-400 rounded-full animate-spin absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
          ) : (
            "Register with Email"
          )}
        </button>
        <button
          onClick={signInWithGoogle}
          className={`w-full bg-red-600 text-white font-bold p-2 rounded relative mt-4 ${isLoadingGoogle ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isLoadingGoogle}
        >
          {isLoadingGoogle ? (
            <div className="w-6 h-6 border-t-2 border-b-2 border-red-100 border-r-2 border-red-400 rounded-full animate-spin absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
          ) : (
            "Register with Google"
          )}
        </button>
        <Link to="/login" className="text-center mt-4 text-blue-500 hover:text-blue-700">
          Already have an account? Login
        </Link>
      </div>
    </div>
  );
}

export default Register;
