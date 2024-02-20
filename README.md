## Crossword 
Crossword is a full-stack web app where users can create their own crossword puzzles, either completely from scratch or with the help of the Word Suggestions tool (sourced from scraped data, and implemented in the UI with context of chosen word length and any existing letters) or the Clue Suggestions tool (prompts OpenAI to suggest a clue). 
Users can also solve crossword puzzles once created, and check accuracy against the correct puzzle contents. 


<img width="806" alt="crosswordcreatescreenshot1" src="https://github.com/e-linds/crossword/assets/145630671/61de6b8b-bd44-4b43-9967-1e645ed60756">


<img width="761" alt="crosswordcreatescreenshot2" src="https://github.com/e-linds/crossword/assets/145630671/7430b199-70aa-468f-87b5-0104be792124">


<img width="754" alt="crosswordsolvescreenshot1" src="https://github.com/e-linds/crossword/assets/145630671/6a9aa51e-9ffe-49df-b756-87cef200a30e">

Crossword is built using React and Vite, and uses Flask/SQLAlchemy on the backend for database management. Dependencies include the OpenAI Developer API; the [Words API](https://www.wordsapi.com/); and Beautiful Soup, which scrapes data from https://www.bestwordlist.com/index.htm. 

A proxy server (included in the src/vite.config file) is used to run the frontend, to avoid CORS errors. Once deployed, this will be removed. The app also includes secure user authentication functionality. 

## To run the backend:
```
pipenv install && pipenv shell
cd backend/server
python app.py
```
## To run the frontend:
```
cd client
npm run dev
```

## Coming soon:
* Deployment!
* Users can send a crossword puzzle to another user to be completed.
