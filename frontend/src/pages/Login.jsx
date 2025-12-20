import React, { useState, useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";

function Login() {
  const [currentState, setCurrentState] = useState("Sign Up");

  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === "Sign Up") {
        const res = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });
        if (res.data.success) {
          setToken(res.data.token);
          localStorage.setItem("token", res.data.token);
          toast.success("Account created successfully!");
        } else {
          toast.error(res.data.message);
        }
      } else {
        const res = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });
        if (res.data.success) {
          setToken(res.data.token);
          localStorage.setItem("token", res.data.token);
          toast.success("Welcome back!");
        } else {
          toast.error(res.data.message);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-70px)] pt-[70px] pb-10 mt-[70px]">
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col items-center w-[90%] max-w-sm sm:max-w-md p-8 sm:p-10 bg-white shadow-xl rounded-xl gap-6"
      >
        <div className="inline-flex items-center gap-3 mb-2">
          <hr className="border-none h-[2px] w-8 bg-black" />
          <p className="text-3xl sm:text-4xl font-bold text-gray-800 tracking-wide">
            {currentState}
          </p>
          <hr className="border-none h-[2px] w-8 bg-black" />
        </div>

        <div className="flex flex-col gap-4 w-full">
          {currentState === "Sign Up" && (
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-black outline-none transition-all"
              placeholder="Full Name"
              required
            />
          )}

          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-black outline-none transition-all"
            placeholder="Email Address"
            required
          />

          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-black outline-none transition-all"
            placeholder="Password"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white px-4 py-3 text-base font-semibold rounded-lg mt-2 hover:bg-gray-800 transition-colors shadow-md"
        >
          {currentState === "Sign Up" ? "Create Account" : "Sign In"}
        </button>

        <div className="w-full flex justify-between text-sm mt-[-10px] px-1">
          <p className="cursor-pointer text-gray-500 hover:text-black">
            Forgot your password?
          </p>
          <p
            onClick={() =>
              setCurrentState(
                currentState === "Sign Up" ? "Sign In" : "Sign Up"
              )
            }
            className="text-black font-semibold cursor-pointer hover:underline"
          >
            {currentState === "Sign Up" ? "Login Here" : "Create account"}
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
