from openai import OpenAI
from config import app
client = OpenAI()

def get_clue(input):

  completion = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
      {"role": "system", "content": "You are assisting a puzzle master in creating crossword puzzle clues with contemporary tone of voice."},
      {"role": "user", "content": f"Give me a clue that hints toward the word {input}."}
    ]
  )

  print(completion.choices[0].message.content)
  return completion.choices[0].message.content

