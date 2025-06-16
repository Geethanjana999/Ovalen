import userModel from "../Models/userModel.mjs";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import { log } from "node:console";

// login user
const loginUser = async (c, s) => {
  const { email, password } = c.body;
  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return s.json({ success: false, message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password); // 1. body password, 2. DB user's Password
    if (!isMatch) {
      return s.json({ success: false, message: "Invalid Credentials" });
    }

    // if passwords are matching, generate a token
    const token = createToken(user._id);
    s.json({ success: true, token });
  } catch (error) {
    console.log(error);
    s.json({ success: false, message: "Error" });
  }
};

// create token
const createToken = (id) => {
  // _id comes as parameter and _id gen by DB
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// register user
const registeruser = async (c, s) => {
  const { name, email, password } = c.body;

  try {
    const exist = await userModel.findOne({ email }); // check if there is already has registerd user
    if (exist) {
      return s.json({ success: false, message: "User Already Exists" });
    }

    // validating email format and strong password
    if (!validator.isEmail(email)) {
      return s.json({ success: false, message: "Please Enter Valid Email" });
    }

    // validating password
    if (password.length < 8) {
      return s.json({ success: false, message: "Please Enter Valid Password" });
    }

    // hashing user's password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save(); // save user in the DB, returns user object {_id: , email: , ..... }
    const token = createToken(user._id); // call gen a token function -> user._id
    s.json({ success: true, token });
  } catch (error) {
    console.log(error);
    s.json({ success: false, message: "Error" });
  }
};

// list users
const listUsers = async (c, s) => {
  try {
    const users = await userModel.find({});
    s.json({ success: true, data: users, message: "User list is fetched" });
  } catch (error) {
    log(error);
    s.json({ success: false, message: "Error" });
  }
};

// remove user / delete user account
const removeUser = async (c, s) => {
  try {
    const id = c.body.id; // user id comes from frontend

    // delete user from the DB
    await userModel.findByIdAndDelete(id);
    s.json({ success: true, message: "User Deleted" });
  } catch (error) {
    log(error);
    s.json({ success: false, message: "Error" });
  }
};

// get profile info
const profileInfo = async (c, s) => {
  try {
    const userId = c.user.id; // Extract user ID from JWT (decoded in middleware)

    // Find user by ID (excluding password)
    const user = await userModel.findById(userId).select("-password");

    if (!user) {
      return s.json({ success: false, message: "User not found" });
    }

    s.json(user);
  } catch (error) {
    log("Error fetching profile:", error);
    s.json({ success: false, message: "Internal server error" });
  }
};

const updateProfile = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Extract user ID from the request object (from token verification)
    const userId = req.user.id; //  the decoded token contains the user id

    // Find the user by ID
    const user = await userModel.findById(userId);

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    // Update fields only if they are provided
    user.name = name || user.name;
    user.email = email || user.email;

    // If the password is provided, hash it before saving
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();

    res.json({
      success: true,
      message: "User Updated",
    });
  } catch (error) {
    console.log("Error updating profile:", error);
    res.status(500).json({ success: false, message: "Error updating profile" });
  }
};

export {
  loginUser,
  registeruser,
  listUsers,
  removeUser,
  profileInfo,
  updateProfile,
};
