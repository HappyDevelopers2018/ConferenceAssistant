from flask import Flask
from flask import render_template,send_file,url_for
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

@app.route('/', methods = ['GET', 'POST'])
@app.route('/login',methods = ['GET','POST'])
def hello_world():
	#return render_template('index.html');
      return send_file('./templates/index.html')

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

if __name__ == '__main__':
    app.run()
