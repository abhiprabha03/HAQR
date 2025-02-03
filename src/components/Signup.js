import React, { useState } from "react";
import { auth, provider } from "./firebase";
import { signInWithPopup } from "firebase/auth";
import BufferLoader from "../pages/BufferLoader";
import { useNavigate } from "react-router-dom";

const SignUpPage = ({ onGoogleSignIn }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError("");

    try {
      const result = await signInWithPopup(auth, provider);
      if (!result.user) throw new Error("No user returned from Google Sign-In");

      const user = result.user;
      console.log("User signed in:", user);

      if (onGoogleSignIn) {
        onGoogleSignIn(user);
      }

      navigate("/dashboard"); // ✅ Redirect only after successful login
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-start justify-center py-8">
      <div className="w-full max-w-2xl h-[600px] flex rounded-lg shadow-lg relative bg-white">
        {/* Blue Section */}
        <div className="w-1/3 bg-gradient-to-r from-indigo-400 to-blue-400 text-white flex flex-col items-center justify-center p-8 rounded-l-lg">
          <h2 className="text-3xl font-bold">Welcome to HAQR</h2>
          <p className="mt-4 text-lg">#1 QR Code Generator</p>
          <p className="mt-2 text-sm">Sign up to start your journey with us!</p>
        </div>

        {/* White Section */}
        <div className="w-2/3 bg-white flex items-center justify-center p-8 rounded-r-lg">
          <div className="w-full max-w-md">
            <h3 className="text-2xl font-semibold text-center mb-4">Please Sign In to Continue</h3>
            <p className="text-center mb-4 text-sm text-gray-600">
              Don’t have an account yet? Sign up quickly with your Google account.
            </p>
            <button
              type="button"
              className={`w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleGoogleSignIn}
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <BufferLoader size="sm" color="white" />
                  <span className="ml-2">Signing in...</span>
                </div>
              ) : (
                "Sign up with Google"
              )}
            </button>
            {error && (
              <div className="mt-4 bg-red-100 text-red-700 border border-red-400 px-4 py-2 rounded">
                {error}
              </div>
            )}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                Already have an account?{" "}
                <span
                  className="text-indigo-600 font-medium cursor-pointer"
                  onClick={() => navigate("/login")}
                >
                  Log in here
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
