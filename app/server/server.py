from flask import Flask
from flask import render_template,send_file
import os
app = Flask(__name__,static_url_path='',
static_folder=os.path.abspath('/home/happy/ConferenceAssistant/app/static'),template_folder=os.path.abspath('/home/happy/ConferenceAssistant/app/templates')
)

@app.route('/', methods = ['GET', 'POST'])
@app.route('/index',methods = ['GET','POST'])
def hello_world():
	#return render_template('index.html');
      return send_file('./templates/index.html')

'''
@app.route('/index')
def hello_world():
    return 'Hello Dog`!'
'''

if __name__ == '__main__':
    app.run(host='139.199.24.75',port=23000)
