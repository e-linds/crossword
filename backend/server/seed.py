from random import randint, choice as rc

from faker import Faker


from app import app
from models import *

fake = Faker()


def create_fake_users():
    for each in range(3):
        new_user = User(
            name = fake.name(),
            email = fake.email(),
            _password_hash = "password",
        )
        db.session.add(new_user)
        db.session.commit()

def create_words():
    
    for each in range(25):
        direction_opts = ["across", "down"]
        random_num = fake.random_int(min=0, max=1)
        new_word = Word(
            name = fake.word(),
            clue = fake.sentence(),
            direction = direction_opts[random_num],
            puzzle_id = fake.random_int(min=1, max=5),
            row_index = None,
            column_index = None

        )
        db.session.add(new_word)
        db.session.commit()
        if random_num == 0:
            new_word.row_index = fake.random_int(min=0, max=19)
        elif random_num == 1:
            new_word.column_index = fake.random_int(min=0, max=19)
        db.session.add(new_word)
        db.session.commit()


def create_puzzles():
    for each in range(5):
        new_puzz = Puzzle(
            name = f"{fake.word()} {fake.word()}"
        )
        db.session.add(new_puzz)
        db.session.commit()

def create_upattempts():
    for each in range(5):
        new = UPAttempt(
            user_id = fake.random_int(min=1, max=3),
            puzzle_id = fake.random_int(min=1, max=5)
        )
        db.session.add(new)
        db.session.commit()

def create_guesses():
    
    for each in range(10):
        direction_opts = ["across", "down"]
        random_num = fake.random_int(min=0, max=1)
        new_guess = Guess(
            name = fake.word(),
            direction = direction_opts[random_num],
            upattempt_id = fake.random_int(min=1, max=5),
            row_index = None, 
            column_index = None
        )
        # if random_num == 0:
        #     new_guess.row_index = fake.random_int(min=0, max=19)
        # elif random_num == 1:
        #     new_guess.column_index = fake.random_int(min=0, max=19)
        db.session.add(new_guess)
        db.session.commit()
        if random_num == 0:
            new_guess.row_index = fake.random_int(min=0, max=19)
        elif random_num == 1:
            new_guess.column_index = fake.random_int(min=0, max=19)
        db.session.add(new_guess)
        db.session.commit()
        # print(new_guess.row_index)


     

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():

        print("Clearing database...")

        User.query.delete()
        Word.query.delete()
        Puzzle.query.delete()
        Guess.query.delete()
        UPAttempt.query.delete()

        
        print("Starting seed...")
        create_fake_users()
        create_words()
        create_puzzles()
        create_upattempts()
        create_guesses()

        print("Done!")