from flask import Flask
from flask_cors import CORS
from flask_session import Session
from flask_jwt_extended import JWTManager

app = Flask(__name__)
app.config.from_object('config.Config')

CORS(app, supports_credentials=True)
Session(app)
jwt = JWTManager(app)

from auth import auth_bp
app.register_blueprint(auth_bp)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
