## Crossword 
Crossword is a full-stack web app where users can create their own crossword puzzles, either completely from scratch or with the help of the Word Suggestions tool (sourced from scraped data, and implemented in the UI with context of chosen word length and any existing letters) or the Clue Suggestions tool (prompts OpenAI to suggest a clue). 
Users can also solve crossword puzzles once created, and check accuracy against the correct puzzle contents. 

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
