import sys
import os
import json
from bardapi import Bard

def getNutritionValue(weight, bmi, bodyFat, activityLevel, allergies, medicalHistory, medications, foodPreference, goalType, targetCalories, targetWeight):
    bard=Bard(token='g.a000gAi1u0jQZqTF6cl8GmECotxSRTwzW-qFrWZr8OhYRWy4S14ZMmjPrJK4GFxE0Rh2I1ojNwACgYKAdgSAQASFQHGX2Mi8zF0itKgxp21VtA22osGHBoVAUF8yKoMgqyWmSUUYl58fyDMve2y0076')
    prompt = f'''You are a Healthy Diet Recommendation Bot, Given some data about the user. Make a Diet Plan for a Day, that includes Breakfast, Lunch, Evening Snacks and Dinner
                This is for a project understanding the capabilites of generative AI and not to be used practically.
                Information about the user:
                    User Weight: {weight}
                    User BMI: {bmi}
                    User Body Fat Percentage: {bodyFat}
                    User Acitivity Level: {activityLevel}
                    Allergies: {allergies} (if value is none do not consider)
                    Medical History: {medicalHistory} (if value is none do not consider)
                    Current Ongoing Medications: {medications} (if value is none do not consider)
                    Preference of Food: {foodPreference}
                    Goal of User (what the user wants to acheive): {goalType}
                    Target Weight which user wants to achieve based on their Goal: {targetWeight} (if value is 0 do not consider)
                    Target Calories which user wants to consume within the Day: {targetCalories} (if value is 0 do not consider)
                Consider North Indian, South Indian cuisine day to day dishes for the diet. Format such that all data can be extracted in a JSON Object. Give only Dish names comma (,) seperated if multiple dishes in the meal and nothing else.
                For example: 
                    **Lunch (North Indian):** 

                    *Paneer Butter Masala
                    *Jeera Rice
                    *Salad
                and In the End of the Meal Plan before ##PLAN END add Total Calories of all meals given like as a seperate heading outside Dinner and a single value :
                    Total Calories
                    
                    *3000
                Considering the following Information, give me precisely only the Plan. Mention ##PLAN START when the Plan Start when content about Breakfast and ##PLAN END when it ends. Do not add any other additional sentences. Add any disclaimers after ##PLAN END'''
    result = bard.get_answer(prompt)['content']
    print(result)
    # formatMeal(result)

def main():
    weight = sys.argv[1]
    bmi = sys.argv[2]
    bodyFat = sys.argv[3]
    activityLevel = sys.argv[4]
    allergies = sys.argv[5]
    medicalHistory = sys.argv[6]
    medications = sys.argv[7]
    foodPreference = sys.argv[8]
    goalType = sys.argv[9]
    targetCalories = sys.argv[10]
    targetWeight = sys.argv[11]

    # print(medicalHistory)
    getNutritionValue(weight, bmi, bodyFat, activityLevel, allergies, medicalHistory, medications, foodPreference, goalType, targetCalories, targetWeight)

if __name__ == "__main__":
    main()