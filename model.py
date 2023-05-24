from sqlalchemy.orm import relationship, backref
from sqlalchemy import Boolean, DateTime, Column, Integer, \
                    String, ForeignKey, UnicodeText
from db import db
from flask_security import UserMixin, RoleMixin
from datetime import datetime

class RolesUsers(db.Model):
    __tablename__ = 'roles_users'
    id = Column(Integer(), primary_key=True)
    user_id = Column('user_id', Integer(), ForeignKey('user.id'))
    role_id = Column('role_id', Integer(), ForeignKey('role.id'))

class Role(db.Model, RoleMixin):
    __tablename__ = 'role'
    id = Column(Integer(), primary_key=True)
    name = Column(String(80), unique=True)
    description = Column(String(255))
    permissions = Column(UnicodeText)

class User(db.Model, UserMixin):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True)
    email = Column(String(255), unique=True)
    username = Column(String(255), unique=True, nullable=True)
    password = Column(String(255), nullable=False)
    # name = Column(String(255))
    user_image = db.Column(db.String())
    active = Column(Boolean())
    fs_uniquifier = Column(String(255), unique=True, nullable=False)
    roles = relationship('Role', secondary='roles_users',
                         backref=backref('users', lazy='dynamic'))




class Posts(db.Model):
    post_id = db.Column(db.Integer , primary_key = True , autoincrement = True)
    user_id = db.Column(db.Integer ,db.ForeignKey("user.id"))
    post_title = db.Column(db.String)
    post_image = db.Column(db.String , nullable = False)
    post_discription = db.Column(db.String)
    post_time = db.Column(db.DateTime, default=datetime.utcnow)

class Follow_data(db.Model):
    id = db.Column(db.Integer , primary_key = True , autoincrement = True)
    user_id = db.Column(db.Integer , db.ForeignKey("user.id"))
    follower_id = db.Column(db.Integer , db.ForeignKey("user.id"))    
    
