import User from "../models/User.js";
import { spawn } from "child_process";

function parseMealPlan(mealPlanText) {
    const mealPlanArray = mealPlanText.trim().split(/\r?\n+/);

    const meals = {};
    let currentMeal = '';

    for (const line of mealPlanArray) {
        if (line.startsWith('**') && line.endsWith(':**')) {
            currentMeal = line.slice(2, -3);
            meals[currentMeal] = [];
        } else if (line.startsWith('*')) {
            const dish = line.slice(2);
            meals[currentMeal].push(dish);
        }
    }
    return meals;
}

export const getRecommendedDiet = async (req, res, next) => {
    try {
        console.log(req.body.userId);
        const user = await User.findById(req.body.userId);
        const pythonScript = './python/dietrecommend.py';
        const args = [user.personalInformation.weight, user.personalInformation.bmi, user.personalInformation.bodyFat, user.activityLevel, user.allergies, user.medicalHistory, user.medications, user.foodPreference, user.goals.goalType, user.goals.targetCalories, user.goals.targetWeight];
        const pythonProcess = spawn('python', [pythonScript, ...args]);

        let output = "";
        let error = "";

        pythonProcess.stdout.on('data', (data) => {
            output += data.toString();
        });

        pythonProcess.stderr.on('data', (data) => {
            error += data.toString();
        });

        pythonProcess.on('close', async (code) => {
            console.log('Python process exited with code', code);
            if (code === 0) {
                console.log(output);
                const result = parseMealPlan(output);
                const updatedUser = await User.findByIdAndUpdate(
                    req.body.userId,
                    {
                        "dietRecommendation": result,
                    },
                    {
                        new: true,
                    }
                );
                if (!updatedUser) {
                    return res.status(404).json({ message: "User not found with ID: " + req.body.userId });
                } else {
                    return res.status(200).json(updatedUser);
                }
                    res.json({ result });
            } else {
                res.status(500).json({ error });
            }
        });
        // res.status(200).json(user);
    } catch (error) {
        next(error);
    }
  };