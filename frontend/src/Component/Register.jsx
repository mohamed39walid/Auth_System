import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/"); // Redirect to home or protected route if already logged in
    }
  }, [navigate]);
  const handleRegister = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    try {
      const response = await fetch("http://localhost:3500/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, age, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const token = data.token;
        localStorage.setItem("token", token);
        window.location.href = "/"; // Redirect to home or protected route
      } else {
        setError(data.message); // Set the error message from the server response
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setError("An error occurred. Please try again later."); // Set a generic error message
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form
          onSubmit={handleRegister}
          className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
          {error && (
            <div className="mb-4 text-red-500 text-center">
              {error}
            </div>
          )}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="age"
            >
              Age
            </label>
            <input
              id="age"
              type="number"
              placeholder="Enter your age"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;
