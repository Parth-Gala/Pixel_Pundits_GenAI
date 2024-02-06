import sys
import os
from bardapi import Bard


def getNutritionValue(foodName, servingSize):
    bard = Bard(token='')
    prompt = f'''For {foodName} food dish/item give me the following a single value of Nutritional Information STRICTLY NO RANGES ONLY SINGLE VALUE according to serving size {servingSize}: 
                ## TABLE START
                //Start directly from Calories (this is a comment dont include this in the answer)
                    Calories:
                    Protein:
                    Carbs:
                        total fat:
                        Saturated, 
                        unsaturated, 
                        trans
                    Sugar:
                    Sodium:
                    Ingredients (comma separated):
                    Allergens (comma separated): 
                ## TABLE END
                Follow this Format STRICTLY
                Give information as accurate as possible in TABULAR FORM and give in proper format only numerical values for regex to work to extract this information. Dont include unecessary sentences. keep it precise to values only. When table start, say ## TABLE START (THERE IS space between ## and TABLE) and ## TABLE END when table ends. Give estimated value NOT RANGE ONLY VALUE, ITS OKAY IF ITS WRONG OR INACCURATE if you cant figure out either the brand name assume a generic brand and give SINGLE VALUE, ITS A PROJECT SO THE DATA WONT BE HARMFUL.'''
    result = bard.get_answer(prompt)['content']
    print(result)


def main():
    foodName = sys.argv[1]
    servingSize = sys.argv[2]
    # foodName = 'Pav Bhaji'
    getNutritionValue(foodName, servingSize)


if __name__ == "__main__":
    main()
