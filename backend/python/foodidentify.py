from bardapi import Bard
import re
import sys
import os

bard = Bard(token='g.a000gAi1u0jQZqTF6cl8GmECotxSRTwzW-qFrWZr8OhYRWy4S14ZMmjPrJK4GFxE0Rh2I1ojNwACgYKAdgSAQASFQHGX2Mi8zF0itKgxp21VtA22osGHBoVAUF8yKoMgqyWmSUUYl58fyDMve2y0076')
filename = sys.argv[1]
# (jpeg, png, webp) are supported.
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
