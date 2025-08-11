from flask import request, jsonify, make_response, Blueprint
from werkzeug.security import generate_password_hash, check_password_hash
from db import get_db
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity, set_refresh_cookies

auth_bp = Blueprint('auth', __name__ , url_prefix='/auth')

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    email = data.get('email')
    password = data['password']
    
    db = get_db()
    cursor = db.cursor()
    
    try:
        cursor.execute("INSERT INTO users (username, email, password_hash) VALUES (?,?,?)",
                    (username, email, generate_password_hash(password)))
        db.commit()
        return jsonify({"message": "User registered successfully"}), 200
    except Exception as e:
        db.rollback()
        return jsonify({'error':str(e)}), 400
    
@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data:
        return jsonify({"error": "Missing JSON body"}), 422
    username = data['username']
    password = data['password']
    
    db = get_db()
    user = db.execute("SELECT * FROM users WHERE username = ?", (username,)).fetchone()
    
    if user and check_password_hash(user['password_hash'], password):
        access_token = create_access_token(identity=str(user['id']))
        refresh_token = create_refresh_token(identity=str(user['id']))
        
        response = make_response(jsonify({
            "access_token": access_token,
            "id":user['id'],
            "username":user['username'],
            "email": user['email']
        }), 200)
        set_refresh_cookies(response,refresh_token)#, httponly=True, secure=True, samesite='Strict')
        
        return response
    else:
        return jsonify({"error": "Invalid credentials"}), 401

@auth_bp.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    current_user = get_jwt_identity()
    new_token = create_access_token(identity=current_user)
    
    return jsonify(access_token=new_token), 200

@auth_bp.route('/logout', methods=['POST'])
def logout():
    response = make_response(jsonify({"message":" Logged out successfully"}), 200)
    response.set_cookie('refresh_token','', httponly=True, secure=True, samesite='Strict')
    
    return response

@auth_bp.route('/me', methods=['GET'])
@jwt_required()
def profile():
    user_id = get_jwt_identity()
    
    db = get_db()
    user = db.execute('SELECT id, username, email FROM users WHERE id= ?', (user_id,)).fetchone()
    
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    return jsonify(dict(user)), 200