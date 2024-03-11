# a simple test Web-application
from flask import Flask, render_template, redirect, request,  url_for, jsonify
from flask_sqlalchemy import SQLAlchemy
import os

#getting the file directory name
basedir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///"+ os.path.join(basedir, "database.db")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class comments(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String, nullable = False)
    comment = db.Column(db.String, nullable = False)

@app.route("/")
def index():
    comments_data = comments.query.all()
    return render_template("index.html", comments = comments_data)

@app.route("/comments", methods=["POST"])
def get_comment():
    
    data = request.json
    name = data.get("name")
    user_comment = data.get("comment")
    print(name, user_comment)

    new_comment = comments(username=name, comment=user_comment)
    db.session.add(new_comment)
    db.session.commit()
    
    response = {"message": "comunication successfully"}
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)

