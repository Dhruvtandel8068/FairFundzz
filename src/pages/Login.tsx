import { useState } from "react";

import { useNavigate, Link } from "react-router-dom";

import API from "../api/axios";

const Login = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      const { data } = await API.post(
        "/auth/login",
        formData
      );

      localStorage.setItem(
        "token",
        data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      navigate("/dashboard");

    } catch (error: any) {

      alert(
        error.response?.data?.message ||
        "Login Failed"
      );

    }
  };

  return (

    <div className="min-h-screen flex">

      {/* LEFT SIDE */}

      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-600 to-green-500 text-white flex-col justify-center items-center p-16">

        <h1 className="text-6xl font-bold mb-6">
          Welcome Back
        </h1>

        <p className="text-2xl text-center leading-relaxed">

          Login and manage your workforce
          efficiently with FairFundz.

        </p>

      </div>

      {/* RIGHT SIDE */}

      <div className="w-full lg:w-1/2 flex justify-center items-center bg-gray-100">

        <div className="bg-white shadow-2xl rounded-3xl p-10 w-[420px]">

          <h2 className="text-4xl font-bold mb-2 text-center">
            Login
          </h2>

          <p className="text-gray-500 text-center mb-8">
            Sign in to continue
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
          >

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="border p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="border p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-xl text-lg font-semibold transition">

              Login

            </button>

          </form>

          <p className="text-center mt-6 text-gray-600">

            Don't have an account?

            <Link
              to="/register"
              className="text-blue-600 font-semibold ml-2"
            >

              Register

            </Link>

          </p>

        </div>

      </div>

    </div>
  );
};

export default Login;