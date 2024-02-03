import sys
import os
import json
import re
from bardapi import Bard

def get_youtube_link(text):
    pattern = r'(http(?:s?)://(?:www\.)?youtu(?:be\.com/watch\?v=|\.be/)([\w\-]+)(?:&(?:amp;)?[\w?=]*)?)'
    matches = re.findall(pattern, text)
    print(matches)
    if matches:
        youtube_link = matches[0][0]
        return youtube_link
    else:
        return None 
    
def get_dish_name(text):
    bard=Bard(token='g.a000gAi1u0jQZqTF6cl8GmECotxSRTwzW-qFrWZr8OhYRWy4S14ZMmjPrJK4GFxE0Rh2I1ojNwACgYKAdgSAQASFQHGX2Mi8zF0itKgxp21VtA22osGHBoVAUF8yKoMgqyWmSUUYl58fyDMve2y0076')
    prompt = f'''Extract only the name of the food dish/item from the sentence given {text}'''
    result = bard.get_answer(prompt)['content']
    regex = r'\*\*(.*?)\*\*'
    match = re.search(regex, result)
    if match:
        food_dish = match.group(1)
        return food_dish
    else:
        return None


def getVideoInfo(foodName):
    bard=Bard(token='g.a000gAi1u0jQZqTF6cl8GmECotxSRTwzW-qFrWZr8OhYRWy4S14ZMmjPrJK4GFxE0Rh2I1ojNwACgYKAdgSAQASFQHGX2Mi8zF0itKgxp21VtA22osGHBoVAUF8yKoMgqyWmSUUYl58fyDMve2y0076')
    prompt = f'''Give me a best working youtube video which is accessible, for making a healthy version of {foodName} with a transcript or steps to prepare the dish. Also provide all steps taken in the video explaining the process to cook the recipe with measurements. If the dish is unhealthy in nature add within the steps a disclaimer that this dish is not healthy. When the transcript start add a ##STEPS START and when it ends add a ##STEPS END.'''
    result = bard.get_answer(prompt)['content']
    print(result)
    # formatMeal(result)

def main():
    # foodName = sys.argv[1]
    user_input = "I want to make ...Help me"
    # print(medicalHistory)
    # getVideoInfo(foodName)
    dish = get_dish_name(user_input)
    # print(dish)
    if dish == None:
        print(user_input)
    else:
        getVideoInfo(dish)

if __name__ == "__main__":
    main()