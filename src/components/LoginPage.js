import React, { useState } from "react";
import { auth, provider } from "./firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError("");

    try {
      const result = await signInWithPopup(auth, provider);
      console.log("User signed in:", result.user);
      navigate("/dashboard");
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailPasswordSignIn = async () => {
    if (!email || !password) {
      setError("❌ Please enter both email and password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (error) {
      console.error("Email/Password Login Error:", error);
      setError("⚠️ Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-center text-2xl font-semibold mb-4">Log In</h2>

        <input
          type="email"
          className="w-full px-4 py-2 border rounded-md mb-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="w-full px-4 py-2 border rounded-md mb-4"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full bg-blue-500 text-white py-2 rounded-lg mb-2 hover:bg-blue-600"
          onClick={handleEmailPasswordSignIn}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Log in with Email & Password"}
        </button>

        <button
          className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
          onClick={handleGoogleSignIn}
          disabled={loading}
        >
          {loading ? "Signing in..." : "Log in with Google"}
        </button>

        {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}

        <p className="text-center text-sm mt-4">
          Don’t have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Sign up here
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
