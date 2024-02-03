import FoodItem from '../models/FoodItem.js';
import { createError } from "../utils/error.js";

export const addFood = async (req, res) => {
    const food = req.body;
    const newFood = new FoodItem(food);
    try {
        await newFood.save();
        res.status(201).json(newFood);
    } catch (error) {
        return next(createError(401, error.message));
    }
}

export const getFoods = async (req, res) => {
    try {
        const foods = await FoodItem.find();
        res.status(200).json(foods);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}