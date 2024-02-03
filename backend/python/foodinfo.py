import sys
import os
from bardapi import Bard

def getNutritionValue(foodName, servingSize):
    bard=Bard(token='g.a000gAi1u0jQZqTF6cl8GmECotxSRTwzW-qFrWZr8OhYRWy4S14ZMmjPrJK4GFxE0Rh2I1ojNwACgYKAdgSAQASFQHGX2Mi8zF0itKgxp21VtA22osGHBoVAUF8yKoMgqyWmSUUYl58fyDMve2y0076')
    prompt = f'''For {foodName} food dish/item give me the following a single value of Nutritional Information STRICTLY NO RANGES ONLY SINGLE VALUE according to serving size {servingSize}: 
                ##TABLE START
                    Calories:
                    Protein:
                    Carbs:
                    Fat: 
                        Saturated, 
                        unsaturated, 
                        trans
                    Sugar:
                    Sodium:
                    Ingredients (comma separated):
                    Allergens (comma separated): 
                ##TABLE END
                Give information as accurate as possible in TABULAR FORM and give in proper format for regex to work to extract this information. Dont include unecessary sentences. keep it precise to values only. When table start, say ##TABLE START and ##TABLE END when table ends'''
    result = bard.get_answer(prompt)['content']
    print(result)

def main():
    foodName = sys.argv[1]
    servingSize = sys.argv[2]
    # foodName = 'Pav Bhaji'
    getNutritionValue(foodName, servingSize)

if __name__ == "__main__":
    main()