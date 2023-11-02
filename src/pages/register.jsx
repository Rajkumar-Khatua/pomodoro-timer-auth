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

  const navigate = useNavigate();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const registerWithEmail = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        updateProfile(userCredential.user, {
          displayName: name,
        }).then(() => {
          console.log(userCredential.user);
          toast("User has successfully registered");
          setTimeout(() => {
            navigate("/");
          }, 3000);
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result.user);
        toast("User has successfully registered");
        setTimeout(() => {
          navigate("/");
        }, 3000);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-400">
      <div className="bg-white p-16 rounded shadow-2xl w-2/3">
        <h2 className="text-3xl font-bold mb-10 text-gray-800">
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
          className="w-full bg-blue-600 text-white font-bold p-2 rounded"
        >
          Register with Email
        </button>
        <button
          onClick={signInWithGoogle}
          className="w-full bg-red-600 text-white font-bold p-2 rounded mt-4"
        >
          Register with Google
        </button>
        <Link to="/login" className="mt-4 text-blue-500 hover:text-blue-700">
          Already have an account? Login
        </Link>
      </div>
    </div>
  );
}

export default Register;
