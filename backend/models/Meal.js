import mongoose from "mongoose";

const mealSchema = new mongoose.Schema(
  {
    name: {
      type: String, //lunch breakfast dinner
      required: true,
    },
    foods: [
      {
        food: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "FoodItem",
        },
      },
    ],
    totalCalories: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

mealSchema.pre("save", function (next) {
  let totalCalories = 0;
  this.foods.forEach((food) => {
    totalCalories += food.food.macronutrients.calories;
  });
  this.totalCalories = totalCalories;
  next();
});

export default mongoose.model("Meal", mealSchema);
