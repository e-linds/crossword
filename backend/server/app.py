from flask import request, session
# from flask_restful import Resource

from config import app, db
from models import *

@app.route('/signup', methods = ["POST"])
def signup():
    if request.method == "POST":
        try:
            data = request.get_json()
            new_user = User(
                name = data.get("name"),
                email = data.get("email")
            )
            print(new_user)
            new_user.password_hash = data.get("password")
            db.session.add(new_user)
            db.session.commit()
            print(new_user)
            
            session["user_id"] = new_user.id
            return new_user.to_dict(), 201
        except Exception as e:
            print(e)
            return {"error": "failure to sign up"}, 422
        
@app.route('/check_session', methods = ["GET"])
def check_session():
    if request.method == "GET":
        if session["user_id"]:
            user = User.query.filter(User.id == session["user_id"]).first()
            return user.to_dict(), 200
        else:
            return {"Error": "unauthorized"}, 401
        
@app.route('/login', methods = ["POST"])
def login():
    if request.method == "POST":
        data = request.get_json()
        user = User.query.filter(User.email == data.get("email")).first()
        if user:
            password = data["password"]

            if user.authenticate(password):
                session["user_id"] = user.id
                return user.to_dict(), 200

        return {"error": "invalid email or password"}, 401
    
@app.route('/logout', methods = ["DELETE"])
def logout():
    if request.method == "DELETE":
        if session["user_id"]:
            session["user_id"] = None
            return {}, 204

        return {"error": "not logged in"}, 401
    
@app.route('/words', methods = ["GET", "POST"])
def words():
    words = Word.query.all()

    if request.method == "GET":
        all_words = []
        for each in words:
            all_words.append(each.to_dict())
        return all_words, 200
    
    if request.method == "POST":
        data = request.get_json()
        new_word = Word(
            name = data.get("name"),
            clue = data.get("clue"),
            direction = data.get("direction"),
            row_index = data.get("row_index"),
            column_index = data.get("column_index"),
            puzzle_id = data.get("puzzle_id")
        )
        db.session.add(new_word)
        db.session.commit()
        return new_word.to_dict(), 201
    

@app.route('/puzzles', methods = ["GET", "POST"])
def puzzles():
    puzzles = Puzzle.query.all()

    if request.method == "GET":
        all_puzzles = []
        for each in puzzles:
            all_puzzles.append(each.to_dict())
        return all_puzzles, 200
    
    if request.method == "POST":
        data = request.get_json()
        new_puzzle = Puzzle(
            name = data.get("name"),
            user_id = data.get("user_id")
            
        )
        db.session.add(new_puzzle)
        db.session.commit()
        return new_puzzle.to_dict(), 201

    

if __name__ == '__main__':
    app.run(port=5555, debug=True)
