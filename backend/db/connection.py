import sqlite3
from flask import g, current_app

DATABASE_PATH = 'database.sqlite3'

def get_db():
    if 'db' not in g:
        g.db = sqlite3.connect(DATABASE_PATH)
        g.db.execute('PRAGMA foreign_keys = ON')
        g.db.row_factory = sqlite3.Row
    return g.db

def close_db(e=None):
    db = g.pop('db', None)
    if db is not None:
        db.close()
