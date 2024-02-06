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
    
@app.route('/words/<int:id>', methods = ["GET", "PATCH", "DELETE"])
def word_by_id(id):
    word = Word.query.filter(Word.id == id).first()

    if request.method == "DELETE":
        try:
            db.session.delete(word)
            db.session.commit()
            return {}, 204
        except:
            return {"error": "unable to delete"}, 400

    

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
    

@app.route('/puzzles/<int:id>', methods = ["GET", "PATCH", "DELETE"])
def puzzle_by_id(id):
    puzzle = Puzzle.query.filter(Puzzle.id == id).first()

    if request.method == "GET":
        return puzzle.to_dict(), 200
    
    if request.method == "PATCH":
        try:
            data = request.get_json()
            for attr in data:  
                setattr(puzzle, attr, data.get(attr))
            db.session.add(puzzle)
            db.session.commit()
            return puzzle.to_dict(), 200
        except:
            return {"error": "unable to edit"}, 304

    if request.method == "DELETE":
        try:
            db.session.delete(puzzle)
            db.session.commit()
            return {}, 204
        except:
            return{"error": "unable to delete"}, 400
        


@app.route('/guesses', methods = ["GET", "POST"])
def guesses():
    guesses = Guess.query.all()

    if request.method == "GET":
        all_guesses = []
        for each in guesses:
            all_guesses.append(each.to_dict())
        return all_guesses, 200
    
    if request.method == "POST":
        data = request.get_json()
        new_guess = Guess(
            name = data.get("name"),
            direction = data.get("direction"),
            row_index = data.get("row_index"),
            column_index = data.get("column_index"),
            upattempt_id = data.get("upattempt_id")
        )
        db.session.add(new_guess)
        db.session.commit()
        return new_guess.to_dict(), 201
    
@app.route('/guesses/<int:id>', methods = ["GET", "PATCH", "DELETE"])
def guess_by_id(id):
    guess = Guess.query.filter(Guess.id == id).first()

    if request.method == "DELETE":
        try: 
            db.session.delete(guess)
            db.session.commit()
            return {}, 204
        except: 
            {"error": "unable to delete"}

    
@app.route('/upattempts', methods = ["GET", "POST"]) 
def upattempts():
    upattempts = UPAttempt.query.all()

    if request.method == "GET":
            all_upattempts = []
            for each in upattempts:
                all_upattempts.append(each.to_dict())
            return all_upattempts, 200
        
    if request.method == "POST":
        data = request.get_json()
        new_upattempt = UPAttempt(
            puzzle_id = data.get("puzzle_id"),
            user_id = data.get("user_id")
                
        )
        db.session.add(new_upattempt)
        db.session.commit()
        return new_upattempt.to_dict(), 201   
    
@app.route('/upattempt/<int:id>', methods = ["GET", "PATCH", "DELETE"])
def upattempt_by_id(id):
    upattempt = UPAttempt.query.filter(UPAttempt.id == id).first()

    if request.method == "GET":
        return upattempt.to_dict()
    
    if request.method == "DELETE":
        try:
            db.session.delete(upattempt)
            db.session.commit()
            return {}, 204
        except:
            {"error": "unable to delete"}

@app.route('/upattempt/<int:id>/guesses', methods = ["DELETE"])
def upattempt_guesses(id):
    guesses = Guess.query.filter(Guess.upattempt_id == id).all()

    if request.method == "DELETE":
        try:
            for each in guesses:
                db.session.delete(each)
                db.session.commit()
            return {}, 204
        except:
            return {"error": "unable to delete"}

    

if __name__ == '__main__':
    app.run(port=5555, debug=True)
