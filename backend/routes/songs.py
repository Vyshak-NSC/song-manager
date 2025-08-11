from flask import Blueprint

song_bp = Blueprint('songs', __name__, url_prefix='/songs')