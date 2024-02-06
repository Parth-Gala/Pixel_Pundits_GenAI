from bardapi import Bard
import re
import sys
import os

bard = Bard(token='')
filename = sys.argv[1]
# (jpeg, png, webp) are supported.
# image = open(f'C:/Users/Vedant/Downloads/{filename}', 'rb').read()
image = open(f'C:/Users/meetgala/Downloads/{filename}', 'rb').read()
# print(f'C:/Users/meetgala/Downloads/{filename}')
bard_answer = bard.ask_about_image(
    'i have captured this pic in india , can you tell me which food dish is this in just onw word . Dish : ? give me answer in which start with the dish name in bold ', image)
paragraph = bard_answer['content']

matches = re.findall(r'\*\*(.*?)\*\*', paragraph)
if matches:
    extracted_text = matches[0]
    print("Dish : ", extracted_text)
else:
    print("No matching text found.")
