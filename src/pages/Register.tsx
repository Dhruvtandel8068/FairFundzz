import { useState } from "react";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import API from "../api/axios";

const Register = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "worker",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLSelectElement
    >
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
        "/auth/register",
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

      alert("Registration Successful");

      navigate("/dashboard");

    } catch (error: any) {

      alert(
        error.response?.data?.message ||
        "Registration Failed"
      );

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

            {/* NAME */}

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="border p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            {/* EMAIL */}

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="border p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            {/* PASSWORD */}

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="border p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            {/* ROLE */}

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="border p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            >

              <option value="worker">
                Worker
              </option>

              <option value="manager">
                Manager
              </option>

              <option value="admin">
                Admin
              </option>

            </select>

            {/* BUTTON */}

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