from flask import Flask

app = Flask(__name__,static_url_path='',
static_folder=os.path.abspath('../static'),template_folder=os.path.abspath('../templates')
)

@app.route('/', methods = ['GET', 'POST'])
@app.route('/index')
def hello_world():
    return 'Hello Dog`!'


if __name__ == '__main__':
    app.run()
