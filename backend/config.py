class Config:
    SECRET_KEY = 'song-ns-app'
    SESSION_TYPE = 'filesystem'
    SESSION_FILE_THRESHOLD = 1000
    SESSION_PERMANENT = False
    JWT_SECRET_KEY = 'ns-song-manager'