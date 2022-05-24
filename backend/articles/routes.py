from flask import jsonify, request
from articles import app, db, bcrypt
from articles.models import Articles, article_schema, articles_schema, User, user_schema, users_schema


@app.route('/register', methods=['POST'])
def create_user():
    if request.method == 'POST':
        username = request.json['username']
        email = request.json['email']
        password_hash = request.json['password_hash']

        user = User(username, email, password_hash)
        db.session.add(user)
        db.session.commit()
        result = user_schema.dump(user)
        return jsonify(result)


@app.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        user = User.query.filter_by(email=request.json['email']).first()
        # if user:
        #     authenticated_user = bcrypt.check_password_hash(user.password_hash, request.json['password_hash'])
        #     if authenticated_user:
        user = User.authenticate(
            request.json['email'], request.json['password_hash'])
        if user:
            # login_user(user)
            result = user_schema.dump(user)
            return jsonify(result)
        return 'Invalid username or password'


@app.route('/users')
def get_users():
    users = User.query.all()
    results = users_schema.dump(users)
    return jsonify(results)


@app.route('/')
@app.route('/get')
def get_articles():
    articles = Articles.query.all()
    len(articles)
    results = articles_schema.dump(articles)
    return jsonify(results)
    # return {"articles": results}


@app.route('/get/<int:id>/')
def get_article(id):
    article = Articles.query.get(id)
    result = article_schema.dump(article)
    return {"article": result}


@app.route('/add', methods=['POST'])
def add_article():
    title = request.json['title']
    body = request.json['body']

    article = Articles(title, body)
    db.session.add(article)
    db.session.commit()

    result = article_schema.dump(article)
    # return {"article": result}
    return jsonify(result)


@app.route('/update/<int:id>/', methods=['PUT'])
def update_article(id):
    article = Articles.query.get(id)

    title = request.json['title']
    body = request.json['body']

    article.title = title
    article.body = body

    db.session.commit()
    result = article_schema.dump(article)
    # return {"article": result}
    return jsonify(result)


@app.route('/delete/<int:id>', methods=['DELETE'])
def delete_article(id):
    article = Articles.query.get(id)
    db.session.delete(article)
    db.session.commit()
    result = article_schema.dump(article)
    return jsonify(result)
