from db import get_db
from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity

playlist_bp = Blueprint('playlists', __name__, url_prefix='/playlists')

@playlist_bp.route('/', methods=['GET'])
@jwt_required()
def get_playlists():
    user_id = get_jwt_identity()
    conn = get_db()
    
    try:
        page = int(request.args.get('page', 1))
        per_page = int(request.args.get('per_page', 10))
        offset = (page - 1) * per_page
    except ValueError:
        return jsonify(error="Invalid pagination parameters"), 400
    
    if page < 1 or per_page < 1:
        return jsonify(error="Page and per_page must be positive integers"), 400
    
    total_playlists = conn.execute("SELECT COUNT(*) FROM playlists WHERE user_id = ?",(user_id,)).fetchone()[0]

    playlists = conn.execute('''
        SELECT * FROM playlists WHERE user_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?
    ''', (user_id, per_page, offset)).fetchall()
    
    total_pages = (total_playlists + per_page-1) // per_page
    playlists_list = [dict(row) for row in playlists]

    return jsonify(playlists=playlists_list), 200

@playlist_bp.route('/', methods=['POST'])
@jwt_required()
def create_playlist():
    user_id = get_jwt_identity()
    conn = get_db()
    
    try:
        data = request.get_json()
        
        if not data or 'name' not in data:
            return jsonify(error="Name is required"), 400
        name = data['name'].strip()
        
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO playlists (user_id, name) VALUES (?, ?)
        ''', (user_id, name))
        conn.commit()
        playlist_id = cursor.lastrowid
        
        playlist = conn.execute('''
            SELECT * FROM playlists WHERE id = ?
        ''', (playlist_id,)).fetchone()
        if not playlist:
            return jsonify(error="Failed to create playlist"), 500
        
        return jsonify(playlist=dict(playlist)), 201
    
    except Exception as e:
        conn.rollback()
        return jsonify(error=str(e)), 500
    finally:
        conn.close()

@playlist_bp.route('/<int:playlist_id>', methods=['GET'])
@jwt_required()
def get_playlist(playlist_id):
    user_id = get_jwt_identity()
    conn = get_db()
    
    playlist = conn.execute('''
        SELECT * FROM playlists WHERE id = ? AND user_id = ?
    ''', (playlist_id, user_id)).fetchone()
    
    if not playlist:
        return jsonify(error="Playlist not found"), 404
    
    return jsonify(playlist=dict(playlist)), 200

@playlist_bp.route('/<int:playlist_id>', methods=['PATCH'])
def update_playlist(playlist_id):
    try:
        user_id = get_jwt_identity()
        conn = get_db()
        cursor = conn.cursor()
        if cursor.rowcount == 0:
            return jsonify(error="Playlist not found"), 404
        
        data = request.get_json()
        if not data or 'name' not in data:
            return jsonify(error="Name is required"), 400
        name = data['name'].strip()
        
        cursor.execute('''
            UPDATE playlists SET name = ? WHERE id = ? AND user_id = ?
        ''', (name, playlist_id, user_id))
        conn.commit()
        
        playlist = conn.excue('''
            SELECT * FROM playlists WHERE id = ? AND user_id = ?)
            ''', (playlist_id,user_id)).fetchone()
        if not playlist:
            return jsonify(error="Failed to update playlist"), 500
        
        return jsonify(dict(playlist)), 200
    except Exception as e:
        return jsonify(error=str(e)), 500