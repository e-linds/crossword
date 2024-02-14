import requests
from bs4 import BeautifulSoup
import random
from config import app
# from env import wordsapikey

wordsapikey = app.wordsapikey

def filter_words(input):

    url = f"https://wordsapiv1.p.rapidapi.com/words/{input}/frequency"

# LEAVE COMMENTED OUT - API USAGE
    headers = {
        "X-RapidAPI-Key": f"{wordsapikey}",
        "X-RapidAPI-Host": "wordsapiv1.p.rapidapi.com"
    }

    response = requests.get(url, headers=headers)

    print(response.json())

    if response.json().get("frequency"):
        print(response.json().get("frequency").get("perMillion"))
        return response.json().get("frequency").get("perMillion")
    else:
        print("false")
        return False
    

    
def get_words(length, letter="000", index=999, ):

    suggestions_array = []
    final_words = {}


    def getIndexText(input):

        if input == 999:
            return 999
        else:
            index = input + 1
        if index == 1:
            return "first"
        elif index == 2:
            return "second"
        elif index == 3:
            return "third"
        elif index == 4:
            return "fourth"
        elif index == 5:
            return "fifth"
        elif index == 6:
            return "sixth"
        elif index == 7:
            return "seventh"
        elif index == 8:
            return "eighth"
        elif index == 9:
            return "ninth"
        elif index == 10:
            return "tenth"
        elif index == 11:
            return "eleventh"
        elif index == 12:
            return "twelfth"
        elif index == 13:
            return "thirteenth"
        elif index == 14:
            return "fourteenth"
        elif index == 15:
            return "fifteenth"
        else:
            return ""




    letterToMatch = letter
    matchLetterIndex = getIndexText(index)
    wordLength = length



    def add_words(input):

        if matchLetterIndex == 999 and letterToMatch == "000":
            
            testurl = f"https://www.bestwordlist.com/{wordLength}letterwords.htm"

        elif matchLetterIndex == "first":

            testurl = f"https://www.bestwordlist.com/d/{letterToMatch}/1/{wordLength}letterwordsbeginning{letterToMatch}.htm"
        
        else:

            testurl = f"https://www.bestwordlist.com/p/{letterToMatch}/1/words{wordLength}letters{matchLetterIndex}letter{letterToMatch}{input}.htm"

        page = requests.get(testurl)
        soup = BeautifulSoup(page.content, "html.parser")

        results = soup.find(class_="mt")
        resultsalt = soup.find_all(class_="dfg")

        if results:
            results_array = results.text.split(" ")
            random_words = random.sample(results_array, 10)
            for each in random_words:
                suggestions_array.append(each)
        elif resultsalt:
            random_words = random.sample(results, 10)
            for each in random_words:
                suggestions_array.append(each.text)


    pagenumber_array = ["", "page2", "page3", "page4", "page5", "page6"]

    #this loop goes through each page of the results and adds words to the suggestions array
    for each in pagenumber_array:
        add_words(each)

        
    filtered_words_easy = []
    filtered_words_medium = []
    filtered_words_hard = []
    print(suggestions_array)
    for each in suggestions_array:
        frequency = filter_words(each)
        if frequency:
            if frequency <= 0.1:
                filtered_words_hard.append(each)
            elif 0.1 < frequency <= 1:
                filtered_words_medium.append(each)
            elif frequency > 1:
                filtered_words_easy.append(each)

    def random_word(array, objkey):
        if (len(array) > 0):
            final_words[objkey] = random.choice(array)
        else:
            final_words[objkey] = None

    random_word(filtered_words_easy, "easy")
    random_word(filtered_words_medium, "medium")
    random_word(filtered_words_hard, "hard")
            
  
    print(final_words)
    return final_words
    
   




    










