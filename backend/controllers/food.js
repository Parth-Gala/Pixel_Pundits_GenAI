import FoodItem from "../models/FoodItem.js";
import { createError } from "../utils/error.js";
import { spawn } from "child_process";

function parseFoodNutrition(text, foodName, servingSize) {
  // Initialize an empty object to store the parsed data
  //   console.log(text);
  const startIndex = text.indexOf("## TABLE START") + "## TABLE START".length;
  const endIndex = text.indexOf("## TABLE END");

  if (startIndex !== -1 && endIndex !== -1) {
    const tableText = text.substring(startIndex, endIndex).trim();
    // console.log(tableText);

    const regex = /(\d+(?:\.\d+)?)\s*(?:g|mg)?/g;
    let match;
    const numericalValues = [];
    while ((match = regex.exec(tableText)) !== null) {
      numericalValues.push(parseFloat(match[1]));
    }
    console.log(numericalValues);
    const macronutrients = {
      calories: numericalValues[0],
      protein: numericalValues[1],
      carbs: numericalValues[2],
      fat: {
        total: numericalValues[3],
        saturated: numericalValues[4],
        unsaturated: numericalValues[5],
        trans: numericalValues[6],
      },
      sugar: numericalValues[7],
      sodium: numericalValues[8],
    };

    const ingredientsIndex = tableText.indexOf("Ingredients");
    const allergensIndex = tableText.indexOf("Allergens");
    const ingredients = tableText
      .substring(ingredientsIndex + 12, allergensIndex)
      .trim()
      .replace(/^\s*\|+|\|+\s*$/g, "")
      .split(/\s*\|+\s*\r?\n\s*/);
    const allergens = tableText
      .substring(allergensIndex + 10)
      .trim()
      .replace(/^\s*\|+|\|+\s*$/g, "");

    const foodNutrition = {
      name: foodName,
      servingSize: servingSize,
      macronutrients: macronutrients,
      ingredients: ingredients,
      allergens: allergens,
    };
    return foodNutrition;
  }
}

export const addFood = async (req, res) => {
  const newFood = new FoodItem({
    name: req.body.name,
    servingSize: req.body.servingSize,
    macronutrients: {
      calories: req.body.macronutrients.calories,
      protein: req.body.macronutrients.protein,
      carbs: req.body.macronutrients.carbs,
      fat: {
        total: req.body.macronutrients.fat.total,
        saturated: req.body.macronutrients.fat.saturated,
        unsaturated: req.body.macronutrients.fat.unsaturated,
      },
    },
    ingredients: req.body.ingredients,
    allergens: req.body.allergens,
    tags: req.body.tags,
    image: req.body.image,
  });
  try {
    await newFood.save();
    const foodId = newFood._id;
    res.status(201).json({ food: newFood, foodId });
  } catch (error) {
    return next(createError(401, error.message));
  }
};

export const getFoods = async (req, res) => {
  try {
    const foods = await FoodItem.find();
    res.status(200).json(foods);
  } catch (error) {
    res.status(404).json(createError(402, error.message));
  }
};

export const getFoodInfo = async (req, res) => {
  try {
    const foods = await FoodItem.findById(req.body.food_id);
    res.status(200).json(foods);
  } catch (error) {
    res.status(404).json(createError(402, error.message));
  }
};

export const getFoodNutrition = async (req, res, next) => {
  try {
    const { foodname, servingsize } = req.body;
    // console.log(foodname);
    const pythonScript = "./python/foodinfo.py";
    const args = [foodname, servingsize];
    const pythonProcess = spawn("python", [pythonScript, ...args]);

    let output = "";
    let error = "";

    pythonProcess.stdout.on("data", (data) => {
      output += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
      error += data.toString();
    });

    pythonProcess.on("close", async (code) => {
      console.log("Python process exited with code", code);
      if (code === 0) {
        console.log(output);
        const foodJSON = parseFoodNutrition(output, foodname, servingsize);
        // console.log(foodJSON);
        const newFood = new FoodItem({
          name: foodJSON.name,
          servingSize: foodJSON.servingSize,
          macronutrients: {
            calories: foodJSON.macronutrients.calories,
            protein: foodJSON.macronutrients.protein,
            carbs: foodJSON.macronutrients.carbs,
            fat: {
              total: foodJSON.macronutrients.fat.total,
              saturated: foodJSON.macronutrients.fat.saturated,
              unsaturated: foodJSON.macronutrients.fat.unsaturated,
            },
            sugar: foodJSON.macronutrients.sugar,
            sodium: foodJSON.macronutrients.sodium,
          },
          ingredients: foodJSON.ingredients,
          allergens: foodJSON.allergens,
        });
        try {
          await newFood.save();
          const foodId = newFood._id;
          res.status(201).json({ foodId: foodId });
        } catch (error) {
          return next(createError(401, error.message));
        }
      } else {
        res.status(500).json({ error });
      }
    });
  } catch (error) {
    next(error);
  }
};
export const identifyFood = async (req, res, next) => {
  try {
    const { fileName } = req.body;
    console.log(fileName);
    const pythonScript = "./python/foodidentify.py";
    const args = [fileName];
    const pythonProcess = spawn("python", [pythonScript, ...args]);

    let output = "";
    let error = "";

    pythonProcess.stdout.on("data", (data) => {
      output += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
      error += data.toString();
    });

    pythonProcess.on("close", (code) => {
      console.log("Python process exited with code", code);
      if (code === 0) {
        res.json({ output });
      } else {
        res.status(500).json({ error });
      }
    });
  } catch (error) {
    next(error);
  }
};
