class Config(object):
    SQLALCHEMY_DATABASE_URI = "sqlite:///bloglite.sqlite3"
    SECRET_KEY = "thisissecret"
    SECURITY_PASSWORD_SALT = "thisissalt"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    WTF_CSRF_ENABLED = False
    SECURITY_TOKEN_AUTHENTICATION_HEADER = "Authentication-Token"
    enable_utc = False
    timezone = "Asia/Calcutta"

    SECURITY_REGISTERABLE = True
    SECURITY_CONFIRMABLE = False
    SECURITY_SEND_REGISTER_EMAIL = False
    SECURITY_UNAUTHORIZED_VIEW = None
    SECURITY_API_ENABLED_METHODS=['token']
    SECURITY_USERNAME_ENABLE=True
    SECURITY_USERNAME_REQUIRED=True

class DevelopmentConfig(Config):
    DEBUG = True