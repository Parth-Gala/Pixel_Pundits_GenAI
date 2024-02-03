import express from "express";
import {
  addFood,
  getFoods,
  getFoodNutrition,
  identifyFood,
} from "../controllers/food.js";

const router = express.Router();

router.post("/addFood", addFood);

//Get
// router.get("/:id", getFood);

//Get All
router.get("/", getFoods);

//Get Food Nutritional Content
router.get("/nutrition", getFoodNutrition);

router.post("/identifyFood", identifyFood);

export default router;
