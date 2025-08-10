from datetime import timedelta


class Config:
    SECRET_KEY = 'song-ns-app'
    SESSION_TYPE = 'filesystem'
    SESSION_FILE_THRESHOLD = 1000
    SESSION_PERMANENT = False
    JWT_SECRET_KEY = 'ns-song-manager'
    JWT_COOKIE_SECURE = False
    JWT_COOKIE_SAMESITE = 'Lax'
    JWT_TOKEN_LOCATION = ['cookies','headers']
    JWT_COOKIE_CSRF_PROTECT = False
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(minutes=15)
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=30)