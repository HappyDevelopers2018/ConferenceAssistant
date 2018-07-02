# coding=utf-8
from flask import Flask
from flask import render_template,send_file,url_for,request
from werkzeug.utils import secure_filename

import os
app = Flask(__name__,static_url_path='',
static_folder=os.path.abspath('/home/happy/ConferenceAssistant/app/static'),template_folder=os.path.abspath('/home/happy/ConferenceAssistant/app/templates')
)

def register_blueprints(app):
    # Prevents circular imports
    from .API import zc
    from .API import holy
    app.register_blueprint(zc)
    app.register_blueprint(holy)
register_blueprints(app)

@app.route('/login',methods = ['GET','POST'])
def hello_world():
	#return render_template('index.html');
      return send_file('./templates/index.html')
@app.route('/', methods = ['GET', 'POST'])
@app.route('/index',methods = ['GET','POST'])
def home():
    return send_file('./templates/home.html')

@app.route('/index_backup',methods = ['GET','POST'])
def backup():
        return send_file('./templates/index_backup.html')

@app.route('/test', methods = ['GET', 'POST'])
def test():
	path_file_name = '/home/happy/txt/action_'+str(0)+'.txt'
	with open(path_file_name, "a") as f:
        	f.write("12345")
	with open(path_file_name) as f:
		file_context = f.read()
		return file_context

@app.route('/process1',methods = ['GET','POST'])
def process1():
	#return render_template('index.html');
      return send_file('./templates/process1.html')

@app.route('/process2',methods = ['GET','POST'])
def process2():
      return send_file('./templates/process2.html')

@app.route('/process3',methods = ['GET','POST'])
def process3():
      return send_file('./templates/process3.html')

@app.route('/process4',methods = ['GET','POST'])
def process4():
      return send_file('./templates/process4.html')

@app.route('/conference_manage',methods = ['GET','POST'])
def process5():
      return send_file('./templates/conference_manage.html')

@app.route('/ConferenceIndex',methods = ['GET','POST'])
def process6():
      return send_file('./templates/ConferenceIndex.html')

@app.route('/primary_info',methods = ['GET','POST'])
def process7():
      return send_file('./templates/primary_info.html')
if __name__ == '__main__':
    app.config['JSON_AS_ASCII'] = False
    app.run()
