from flask import Blueprint, request, jsonify, session
from werkzeug.security import generate_password_hash, check_password_hash
from db import get_db
from functools import wraps

auth_bp = Blueprint('auth', __name__)

def login_required(f):
    @wraps(f)
    def wrapped(*args, **kwargs):
        if 'user_id' not in session:
            return jsonify({'error':'Login required'})
        return f(*args, **kwargs)
    
    return wrapped



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
        return jsonify({"message": "User registered successfully"}), 201
    except Exception as e:
        db.rollback()
        return jsonify({'error':str(e)}), 400
    
@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data['username']
    password = data['password']
    
    db = get_db()
    user = db.execute("SELECT * FROM users WHERE username = ?", (username,)).fetchone()
    
    if user and check_password_hash(user['password_hash'], password):
        session['user_id'] = user['id']
        return jsonify({
            "id":user['id'],
            "username":user['username'],
            "email": user['email']
        }), 201
    else:
        return jsonify({"error": "Invalid credentials"}), 401
    
@auth_bp.route('/logout', methods=['POST'])
def logout():
    session.pop('user_id', None)
    return jsonify({"message": "Logged out successfully"}), 201

@auth_bp.route('/me', methods=['GET'])
@login_required
def profile():
    if 'user_id' not in session:
        return jsonify({'error':'Login Required'})
    
    db = get_db()
    user = db.execute('SELECT id, username, email FROM users WHERE id= ?', (session['user_id'],)).fetchone()
    
    return jsonify(dict(user)), 201