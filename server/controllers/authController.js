import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {

  try {

    const {
      name,
      email,
      password,
      role,
    } = req.body;

    // CHECK EXISTING USER
    const existingUser =
      await User.findOne({
        email,
      });

    if (existingUser) {

      return res.status(400).json({
        message: "User already exists",
      });

    }

    // HASH PASSWORD
    const hashedPassword =
      await bcrypt.hash(password, 10);

    // CREATE USER
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // TOKEN
    const token = jwt.sign(
      { id: user._id },
      "fairfundzsecret",
      {
        expiresIn: "7d",
      }
    );

    res.status(201).json({
      token,
      user,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }
};


export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid Email",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Password",
      });
    }

    const token = jwt.sign(
      { id: user._id },
      "fairfundzsecret",
      {
        expiresIn: "7d",
      }
    );

    res.json({
      token,
      user,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};