import { useState } from "react";

import { useNavigate, Link } from "react-router-dom";

import API from "../api/axios";

const Register = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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

      await API.post(
        "/auth/register",
        formData
      );

      alert("Registration Successful");

      navigate("/login");

    } catch (error) {

      console.log(error);

    }
  };

  return (

    <div className="min-h-screen flex">

      {/* LEFT SIDE */}

      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-600 to-green-500 text-white flex-col justify-center items-center p-16">

        <h1 className="text-6xl font-bold mb-6">
          FairFundz
        </h1>

        <p className="text-2xl text-center leading-relaxed">

          Smart worker wage management platform
          for modern businesses.

        </p>

      </div>

      {/* RIGHT SIDE */}

      <div className="w-full lg:w-1/2 flex justify-center items-center bg-gray-100">

        <div className="bg-white shadow-2xl rounded-3xl p-10 w-[420px]">

          <h2 className="text-4xl font-bold mb-2 text-center">
            Create Account
          </h2>

          <p className="text-gray-500 text-center mb-8">
            Register to continue
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
          >

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              className="border p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              onChange={handleChange}
              className="border p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="border p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-xl text-lg font-semibold transition">

              Register

            </button>

          </form>

          <p className="text-center mt-6 text-gray-600">

            Already have an account?

            <Link
              to="/login"
              className="text-blue-600 font-semibold ml-2"
            >

              Login

            </Link>

          </p>

        </div>

      </div>

    </div>
  );
};

export default Register;