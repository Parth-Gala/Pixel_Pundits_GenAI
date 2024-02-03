import mongoose from "mongoose";

const foodItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    servingSize: {
        type: Number,
        required: true,
        default: 0,
    },
    macronutrients: {
        calories: {
            type: Number,
            required: true,
            default: 0,
        },
        protein: {
            type: Number,
            required: true,
            default: 0,
        },
        carbs: {
            type: Number,
            default: 0,
        },
        fat: {
            total: {
                type: Number,
                default: 0,
            },
            saturated:{
                type: Number,
                default: 0,
            },
            unsaturated:{
                type: Number,
                default: 0,
            },
            trans: {
                type: Number,
                default: 0,
            }
        },
        sugar: {
            type: Number,
            default: 0,
        },
        sodium: {
            type: Number,
            default: 0,
        }
    },
    ingredients: [{
        type: String,
    }],
    allergens: [{
        type: String,
    }],
    tags: [{
        type: String,
    }],
    image: {
        type: String,
        default: "",
    },
});

export default mongoose.model('FoodItem', foodItemSchema);
