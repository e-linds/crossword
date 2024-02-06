from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy import Column, String, Integer, ForeignKey, MetaData
from sqlalchemy.orm import validates, relationship
from flask_sqlalchemy import SQLAlchemy

from config import db, bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = Column(Integer, primary_key = True)
    name = Column(String, nullable = False)
    _password_hash = Column(String, nullable = False)
    email = Column(String, nullable = False)

    puzzles = relationship("Puzzle", back_populates="user")
    upattempts = relationship("UPAttempt", back_populates="user")

    serialize_rules = ('-upattempts.user', '-puzzles.user',)
  

    def __repr__(self):
        return f"Name: {self.name}, email: {self.email}, id: {self.id}"

    @validates("email")
    def validate_email(self, key, email):
        if "@" not in email:
            return ValueError("must input valid email")
        else:
            return email

    @hybrid_property
    def password_hash(self):
        raise AttributeError("Password hash may not be accessed")
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')


    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8')
        )


class Puzzle(db.Model, SerializerMixin):
    __tablename__ = "puzzles"

    id = Column(Integer, primary_key = True)
    name = Column(String)
    user_id = Column(Integer, ForeignKey("users.id"))

    words = relationship("Word", back_populates = "puzzle")
    user = relationship("User", back_populates = "puzzles")

    serialize_rules = ('-words.puzzle', '-user.puzzles',)
   

class Word(db.Model, SerializerMixin):
    __tablename__ = "words"

    id = Column(Integer, primary_key = True)
    name = Column(String, nullable = False)
    clue = Column(String)
    direction = Column(String)
    row_index = Column(Integer)
    column_index = Column(Integer)
    puzzle_id = Column(Integer, ForeignKey("puzzles.id"))

    puzzle = relationship("Puzzle", back_populates="words")

    serialize_rules = ('-puzzle.words',)


class UPAttempt(db.Model, SerializerMixin):
    __tablename__ = "upattempts"

    id = Column(Integer, primary_key = True)
    puzzle_id = Column(Integer, ForeignKey("puzzles.id"))
    user_id = Column(Integer, ForeignKey("users.id"))

    guesses = relationship("Guess", back_populates="upattempt")
    user = relationship("User", back_populates="upattempts")

    serialize_rules = ('-guesses.upattempt', '-user.upattempts',)


class Guess(db.Model, SerializerMixin):
    __tablename__ = "guesses"

    id = Column(Integer, primary_key = True)
    name = Column(String, nullable = False)
    direction = Column(String)
    row_index = Column(Integer)
    column_index = Column(Integer)
    upattempt_id = Column(Integer, ForeignKey("upattempts.id"))

    upattempt = relationship("UPAttempt", back_populates="guesses")

    serialize_rules = ('-upattempt.guesses',)



    
