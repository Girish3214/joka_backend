import expressAsyncHandler from "express-async-handler";
import User from "../models/userModal.js";

import jwt from "jsonwebtoken";

const registerUser = expressAsyncHandler(async (req, res) => {
  const { email, password, name, phone } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).send("User already exists");
  }

  const newUser = new User({ email, name, password, phone });
  const user = await newUser.save();

  if (user) {
    console.log(user);
    return res.status(201).send(user);
  } else {
    return res.status(400).send("something went wrong, please try again later");
  }
});

const loginUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).send("User Not Found");
  }

  if (user && (await user.matchPassword(password))) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const { _id, name, email, password, isAdmin, phone } = user;
    return res.status(200).send({
      _id,
      name,
      email,
      password,
      isAdmin,
      phone,
      token,
    });
  } else {
    return res.status(400).send("Password is incorrect");
  }
});

export { registerUser, loginUser };
