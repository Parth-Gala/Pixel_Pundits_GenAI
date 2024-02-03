import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

export const register = async (req, res, next) => {
  try {
    console.log("Body",req.body);
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
      gender: req.body.gender,
      dob: req.body.dob,
      gender: req.body.gender,
      personalInformation: {
        height: req.body.personalInformation.height,
        weight: req.body.personalInformation.weight,
        neck: req.body.personalInformation.neck,
        waist: req.body.personalInformation.waist,
      },
      activityLevel: req.body.activityLevel,
      goals: {
        goalType: req.body.goals.goalType,
      },
      foodPreference:req.body.foodPreference,
      allergies:req.body.allergies,
      medications:req.body.medications,
      medicalHistory:req.body.medicalHistory


    });
    await newUser.save();
    res.status(200).send("User registered successfully");
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    console.log(user);
    if (!user) return next(createError(404, "User not found"));

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return next(createError(400, "Wrong password or Username!!!"));

    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET
    );
    const { password, isAdmin, ...otherDetails } = user._doc;

    res
      .cookie("access_token", accessToken, { httpOnly: true })
      .status(200)
      .json({ ...otherDetails });
  } catch (error) {
    next(error);
  }
};

// export const gauthlogin = async (req,res,next)=>{
//     try {
//         res.redirect("http://localhost:3001/");
//     } catch (error) {
//         next(error)
//     }
// }
