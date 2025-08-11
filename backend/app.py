from flask import Flask
from flask_cors import CORS
from flask_session import Session
from flask_jwt_extended import JWTManager
from db import init_app
from db.init_db import init_db

app = Flask(__name__)
app.config.from_object('config.Config')

CORS(app,origins=["http://localhost:3000", "http://192.168.29.4:3000"], supports_credentials=True)
Session(app)
jwt = JWTManager(app)

init_app(app)
with app.app_context():
    init_db() 
    
from routes import auth_bp, playlist_bp, song_bp
app.register_blueprint(auth_bp)
app.register_blueprint(song_bp)
app.register_blueprint(playlist_bp)

@app.route('/')
def index():
    return "Server Running"

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
