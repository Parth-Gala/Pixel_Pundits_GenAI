import FoodItem from '../models/FoodItem.js';
import { createError } from "../utils/error.js";
import { spawn } from "child_process";

function parseFoodNutrition(text, foodName, servingSize) {
    // Initialize an empty object to store the parsed data
    console.log(text);
    const startIndex = text.indexOf('##TABLE START') + '##TABLE START'.length;
    const endIndex = text.indexOf('##TABLE END');

    if (startIndex !== -1 && endIndex !== -1) {
        const tableText = text.substring(startIndex, endIndex).trim();
        // console.log(tableText);

        const regex = /(\d+(?:\.\d+)?)\s*(?:g|mg)?/g;
        let match;
        const numericalValues = [];
        while ((match = regex.exec(tableText)) !== null) {
            numericalValues.push(parseFloat(match[1]));
        }
        // console.log(numericalValues);
        const macronutrients = {
            calories: numericalValues[0],
            protein: numericalValues[1],
            carbs: numericalValues[2],
            fat: {
                total: numericalValues[3],
                saturated: numericalValues[4],
                unsaturated: numericalValues[5],
                trans: numericalValues[6]
            },
            sugar: numericalValues[7],
            sodium: numericalValues[8],
        };

        const ingredientsIndex = tableText.indexOf('Ingredients');
        const allergensIndex = tableText.indexOf('Allergens');
        const ingredients = tableText.substring(ingredientsIndex + 12, allergensIndex).trim().replace(/^\s*\|+|\|+\s*$/g, '').split(/\s*\|+\s*\r?\n\s*/);
        const allergens = tableText.substring(allergensIndex + 10).trim().replace(/^\s*\|+|\|+\s*$/g, '');

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
            }
        },
        ingredients: req.body.ingredients,
        allergens: req.body.allergens,
        tags: req.body.tags,
      });
    try {
        await newFood.save();
        const foodId = newFood._id;
        res.status(201).json({ food: newFood, foodId});

    } catch (error) {
        return next(createError(401, error.message));
    }
};

export const getFoods = async (req, res) => {
    try {
        const foods = await FoodItem.findById(req.param.id);
        res.status(200).json(foods);
    } catch (error) {
        res.status(404).json(createError(402, error.message ));
    }
};

export const getFoodNutrition = async (req, res, next) => {
    try {
        const { foodname, servingsize } = req.body;
        const pythonScript = './python/foodinfo.py';
        const args = [foodname, servingsize];
        const pythonProcess = spawn('python', [pythonScript, ...args]);

        let output = "";
        let error = "";

        pythonProcess.stdout.on('data', (data) => {
            output += data.toString();
        });

        pythonProcess.stderr.on('data', (data) => {
            error += data.toString();
        });

        pythonProcess.on('close', (code) => {
            console.log('Python process exited with code', code);
            if (code === 0) {
                const foodJSON = parseFoodNutrition(output, foodname, servingsize);
                res.json({ foodJSON });
            } else {
                res.status(500).json({ error });
            }
        });
    } catch (error) {
        next(error);
    }
};