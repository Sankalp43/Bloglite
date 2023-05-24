
# ------------------------------------------Importing Libraries-----------------------------

from flask import Flask, render_template, send_file
from flask_security import Security, current_user, auth_required, SQLAlchemyUserDatastore
# from flask_sqlalchemy import SQLAlchemy
# from flask_restful import Resource, Api
from flask import request, jsonify
from api import api , Api
import time
from json import dumps

from httplib2 import Http

# _________________________
from config import DevelopmentConfig
from db import db
from model import *
from celery_w import make_celery
from celery.result import AsyncResult

from flask_restful import Resource

# _________________________


import smtplib
import datetime
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders
from jinja2 import Template
from celery.schedules import crontab

# _________________________

from cache import cache


# ---------------------------------App Setup------------------


# Create app
app = Flask(__name__)
app.config['DEBUG'] = True

app.config.from_object(DevelopmentConfig)                                   #Celery


db.init_app(app)                                                            #Database
api.init_app(app)                                                           # API

api = Api(app)                                                              #Same file API


app.config.update(
    CELERY_BROKER_URL='redis://localhost:6379',                             #redis
    CELERY_RESULT_BACKEND='redis://localhost:6379',)
    

cache.init_app(app)                                                         #Cache
celery = make_celery(app)                                                   #Celery


user_datastore = SQLAlchemyUserDatastore(db, User, Role)                    #Flask Security
app.security = Security(app, user_datastore)                                #Flask Security

    


# ----------------------------------Creating the Databse-------------------------
with app.app_context():    
    db.create_all()
    if not app.security.datastore.find_user(email="test@me.com"):
        app.security.datastore.create_user(email="test@me.com", password="password" )
    db.session.commit()




# ---------------------------------Function For Sending the Mail to MailHog-------------------

SMPTP_SERVER_HOST = "localhost"
SMPTP_SERVER_PORT = 1025
SENDER_ADDRESS = "test@user.com"
SENDER_PASSWORD = ""

def send_email(to_adress , subject , message , content = 'text' , attachment_file = None):
    msg = MIMEMultipart()
    msg['Form'] = SENDER_ADDRESS
    msg['To'] = to_adress
    msg['From'] = "team@bloglite"
    msg['Subject'] = subject

    if content == 'html':
        msg.attach(MIMEText(message , 'html'))
    else:
        msg.attach(MIMEText(message, 'plain'))

    if attachment_file:
        with open(attachment_file , "rb") as attachment:
            part = MIMEBase("application" , "octet-stream")
            part.set_payload(attachment.read())
        encoders.encode_base64(part)
        msg.attach(part)
    
    s = smtplib.SMTP(host=SMPTP_SERVER_HOST , port=SMPTP_SERVER_PORT)
    s.login(SENDER_ADDRESS , SENDER_PASSWORD)
    s.send_message(msg)
    s.quit()
    return True

# ------------------------------Celery Tasks------------------------------


@celery.task()
def add_together(a, b):
    print("hell0")
    time.sleep(5.0)
    return a + b
# ____________________________________________

@celery.task()
def export_job(user_id):
    user = User.query.filter_by(id = user_id).first()
    mail = user.email
    uname = user.username

    posts_by_user = Posts.query.filter_by(user_id = user_id).all()
    following_list = Follow_data.query.filter_by(user_id = user_id).all()
    following = len(following_list)
    follow_list = Follow_data.query.filter_by(follower_id = user_id).all()

    print("Hello")

    print(uname)
    with open(f'static/reportof{uname}.csv' , 'w') as rep:
        rep.write(f'USER NAME : {uname}\n')
        rep.write(f"USER MAIL : {mail}\n")
        rep.write(f"USER posts : {len(posts_by_user)}\n")
        rep.write(f"Followers : {len(follow_list)}\n")
        rep.write(f"Following : {following}\n")

    return "generating your Report....... "
# ____________________________________________

@celery.task()
def webhook_work():
    url = 'https://chat.googleapis.com/v1/spaces/AAAAtOME3pg/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=gHfiaCxWlpd2jMCzArVJjPtketmS2QAs0b7Cwtr0O-M%3D'
    bot_message = {
        'text': '''Hi Bloglitian,
                Just a friendly reminder that Bloglite is here for you every day! Whether you're looking to stay connected with your friends and family, 
                share your favorite moments, or discover new interests, Bloglite has got you covered.
		        If you haven't checked the app recently, why not take a few minutes now to explore and see what's new?
                And if you're already up to date, thank you for staying connected with Bloglite!!
                                                                                Best regards,
                                                                                BLOGLITE TEAM'''
        
        
        
        
        
        
        }
    message_headers = {'Content-Type': 'application/json; charset=UTF-8'}
    http_obj = Http()
    response = http_obj.request(
        uri=url,
        method='POST',
        headers=message_headers,
        body=dumps(bot_message),
    )
    print(response)
    return("message is sending.......")
# ____________________________________________


@celery.task
def send_reminder_via_email_daily():
    
    users = User.query.all()
    for user in users:
        with open("mail_template_daily_remain.html", 'r') as tmp:
            msg=Template(tmp.read())        
        send_email(
            to_adress= user.email,
            subject = "BlogLite Daily Remainder",
            message=msg.render(user_name = user.username),
            content = 'html'


        )
    return "Emails Should Send."
# ____________________________________________



@celery.task
def send_report_via_email_monthly():
    users = User.query.all()
    for user in users:
        posts  = len(list(Posts.query.filter_by(user_id = user.id).all()),)
        following = len(list(Follow_data.query.filter_by(user_id = user.id).all()))
        followers = len(list(Follow_data.query.filter_by(follower_id = user.id).all()))

        with open("mail_template_monthly_report.html", 'r') as tmp:
            msg=Template(tmp.read())

                
        send_email(
            to_adress= user.email,
            subject = "Bloglite Monthly report",
            message=msg.render(user_name = user.username , posts = posts , followers = followers , following = following),
            content = 'html')
    pass

#----------------------------Celery Scheduled Job-----------------------------


@celery.on_after_configure.connect
def setup_periodic_tasks(sender , **kwargs):
    sender.add_periodic_task(crontab() ,webhook_work.s(), name='webhook_work'   )
    sender.add_periodic_task(crontab() , send_reminder_via_email_daily.s(), name='Mail_work'   )
    sender.add_periodic_task(crontab(), send_report_via_email_monthly.s(), name='Mail_report_work'   )


# ------------------------------------API For Celery Work-------------------------
  
class Celery(Resource):
    def get(self):
        a = add_together.delay(5,5)
        return { "id" : a.id,
                "result" : a.result}

  
class ExportJob(Resource):
    @auth_required('token')
    def post(self):
        signup_credentials = request.get_json()
        user_id = signup_credentials.get('id')
        gen = export_job.delay(user_id)
        return {
        "Id" : gen.id,
        "State" : gen.state,
        "Result" : gen.result
    }

class GetStatus(Resource):
    @auth_required('token')
    def post(self):
        signup_credentials = request.get_json()
        task_id = signup_credentials.get('task_id')
        status = AsyncResult(task_id, app = celery)
        return {
        "task_ID" : status.id,
        "task_State" : status.state,
        "task_Result" : status.result
    }
       



       


# ---------------------Adding APIs for Celery Work-------------------

api.add_resource(Celery , '/celery_test')
api.add_resource(ExportJob , '/report')
api.add_resource(GetStatus , '/get_status')


@app.route("/get_file/<user_name>")
def download_file(user_name):
    print("SEnding the file.......")
    return send_file(f'static/reportof{user_name}.csv')




# -------------------------Make the App Run----------------------

@app.route("/")
def home():
    return render_template("index.html")
if __name__ == '__main__':
    # run application (can also use flask run)
    app.run()