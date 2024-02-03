import express from "express";
import {
  addFood,
  getFoodInfo,
  getFoods,
  getFoodNutrition,
  identifyFood,
} from "../controllers/food.js";

const router = express.Router();

router.post("/addFood", addFood);

//Get
router.post("/getInfo", getFoodInfo);

//Get All
router.get("/", getFoods);

//Get Food Nutritional Content
router.post("/nutrition", getFoodNutrition);

router.post("/identifyFood", identifyFood);

export default router;
