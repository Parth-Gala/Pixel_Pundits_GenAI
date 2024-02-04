import mongoose from "mongoose";

const mealSchema = new mongoose.Schema(
  {
    name: {
      type: String, 
      required: true,
    },
    foods:[{
          type: mongoose.Schema.Types.ObjectId,
          ref: "FoodItem",
        }],
    totalCalories: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Meal", mealSchema);
