import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import usersRoute from "./routes/users.js";
import authRoute from "./routes/auth.js";
import session from "express-session";
import foodRoute from "./routes/foods.js";
import mealRoute from "./routes/meals.js";
import aiDietRoute from "./routes/aidiets.js";

import cors from "cors";

const app = express();
dotenv.config();

const connect = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO); 
        console.log("Connected to MongoDB");
    } catch (error) {
        throw error;
    }
};

mongoose.connection.on("disconnected",()=>{
    console.log("MongoDB Disconnected!!");
});

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret: "fkjfvfmyi846746tfk",
    resave: true,
    saveUninitialized: true,
}));

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute );
app.use("/api/foods", foodRoute);
app.use("/api/meals", mealRoute);
app.use("/api/ai", aiDietRoute);

app.use((err, req, res, next)=>{
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});

app.listen(5000, ()=>{
    connect()
    console.log("Server is running on port 5000")
})