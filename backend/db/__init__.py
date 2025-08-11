from flask import Flask
from .connection import close_db, get_db

def init_app(app: Flask):
    app.teardown_appcontext(close_db)