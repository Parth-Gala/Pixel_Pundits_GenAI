import User from "../models/User.js";
import { spawn } from "child_process";

// Update
export const updateUser = async (req, res, next) => {
  try {
    const userupdate = await User.findByIdAndUpdate(
      req.params.id,
      { $set: ture },
      { next: true }
    );
    res.status(200).json(userupdate);
  } catch (error) {
    next(err);
  }
};

// Delete
export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted");
  } catch (error) {
    next(err);
  }
};

// Get
export const getUser = async (req, res, next) => {
  try {
    const getuser = await User.findOne({ username: req.params.name });
    // const userId = getuser._id;
    res.status(200).json( getuser);
  } catch (error) {
    next(err);
  }
};

// Get All
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const getUserRecommendation = async (req, res, next) => {
  try{
    const { input1, input2 } = req.body;
    const pythonScript = './python/recommend.py';
    const args = [input1, input2];

    const pythonProcess = spawn(pythonScript, ...args);

    pythonProcess.stdout.on('data', (data) =>{
      const output = data.toString();
    });

    pythonProcess.stderr.on('data', (data) =>{
      const error = data.toString();
    });

    pythonProcess.on('close', async(code) => {
      console.log('output');
      if(code == 0) {
        res.json({output});
      }
      else {
        res.status(500).json({error});
      }
    });
  } catch (error) {
    next(error);
  }
};

