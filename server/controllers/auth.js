const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;

    const salt = await bycrypt.genSalt();
    const hashedPassword = await bycrypt.hash(password, salt);
    const newUSer = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });
    const savedUser = await newUSer.save();
    res.staus(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
