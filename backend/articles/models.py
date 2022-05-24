from articles import db, bcrypt
import datetime
from marshmallow_sqlalchemy import SQLAlchemySchema
from marshmallow import fields


class User(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    username = db.Column(db.String(length=30), nullable=False)
    email = db.Column(db.String(50), nullable=False, unique=True)
    password_hash = db.Column(db.String(60), nullable=False)
    # articles = db.relationship('Articles', backref='owner_user', lazy=True)

    def __init__(self, username, email, password_hash):
        self.username = username
        self.email = email
        self.password_hash = bcrypt.generate_password_hash(password_hash).decode('utf-8')

    @classmethod
    def authenticate(cls, email, password_hash):
        user = User.query.filter_by(email=email).first()
        if user:
            authenticated_user = bcrypt.check_password_hash(user.password_hash, password_hash)
            if authenticated_user:
                return user
            return False

    @property
    def password(self):
        return self.password

    @password.setter
    def password(self, plain_text_password):
        self.password_hash = bcrypt.generate_password_hash(
            plain_text_password
        ).decode('utf-8')

        


class UserSchema(SQLAlchemySchema):
    class meta:
        model = User
        exclude = ('password')

    id = fields.Integer(dumb_only=True)
    username = fields.String(required=True)
    email = fields.String(required=True)
    password_hash = fields.String(required=True)


user_schema = UserSchema()
users_schema = UserSchema(many=True)


class Articles(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    title = db.Column(db.String(30), nullable=False)
    body = db.Column(db.Text())
    date = db.Column(db.DateTime(), default=datetime.datetime.now)
    # owner = db.Column(db.Integer(), db.ForeignKey('user.id'))

    def __init__(self, title, body):
        self.title = title
        self.body = body


class ArticlesSchema(SQLAlchemySchema):
    class meta:
        model = Articles

    id = fields.Integer(dumb_only=True)
    title = fields.String(required=True)
    body = fields.String(required=True)
    date = fields.DateTime()


article_schema = ArticlesSchema()
articles_schema = ArticlesSchema(many=True)
