#-*- coding: utf-8 -*-

from sqlalchemy import create_engine
from flask  import Flask,request,session,g,redirect,url_for,Blueprint,jsonify,send_file,render_template
import os
from werkzeug.utils import secure_filename
import json
import urllib.parse
# 连接数据库的模块：//用户名:密码@ip:端口/数据库
engine = create_engine("mysql+pymysql://root:123@localhost:3306/happy?charset=utf8")

zc = Blueprint('zc', __name__)
def getSearchResult(str,db):
  queryStr='select * from '+ db+' where conferenceName= '
  queryStr+=str
  result=engine.execute(queryStr)
  ret=result.fetchall()

  return ret
def getParam (str):
  keyValue = str.split("&")
  obj = {}
  for index in keyValue:
    item = index.split("=")
    obj[item[0]] = item[1]
  return obj

def getID(obj,db):
  queryStr='select id from '+db+' where '
  l=len(obj)
  for each in obj:
    l-=1
    queryStr+=each+'="'+urllib.parse.unquote(obj[each])+'"'
    if l>0:
      queryStr+=' and '
  print("getID: "+queryStr)
  result = engine.execute(queryStr)
  ret = result.fetchall()
  return ret

def insertDB(obj,db):
  queryStr='insert into '+db+'('
  queryStr2=') values ('
  l=len(obj)
  for each in obj:
    l-=1
    print(each,urllib.parse.unquote(obj[each]))
    queryStr+=each
    queryStr2+='"'+urllib.parse.unquote(obj[each])+'"'
    if l>0:
      queryStr+=','
      queryStr2+=','

  queryStr=queryStr+queryStr2+')'
  print(queryStr)
  return queryStr

# @zc.route('/login/<name>/<pw>',methods=['GET'])
# def login(name,pw):
#   if request.method == 'GET':
#     print(name,pw)
#     result = engine.execute('select id from user where name="'+name+'" and password="'+pw+'"')
#     ret = result.fetchall()
#     retArr=[]
#     retArr.append({"result":len(ret)})
#     return json.dumps(retArr,ensure_ascii=False)
#     # return jsonify({"result":len(ret)})

@zc.route('/loginAPI',methods=['POST'])
def login():
  if request.method == 'POST':
    data = getParam((request.get_data()).decode('UTF-8'))
    print(request.get_data())
    tmp=urllib.parse.unquote(data['name'])
    print('========= tmpdata : ',tmp,'=============')
    result = engine.execute('select id,identity from user where name="'+tmp+'" and password="'+data['password']+'"')
    ret = result.fetchall()
    # return json.dumps(retArr,ensure_ascii=False)
    print(ret)
    if len(ret)==0:
      print('null')
      return jsonify({"result":0})
    return jsonify({"result":ret[0][1],"id":ret[0][0]})

@zc.route('/registerAPI',methods=['POST'])
def register():
  if request.method == 'POST':
    file = request.files['file']
    filename=file.filename
    filePathName,extension=os.path.splitext(filename)
    userName=request.form.get('userName')

    filename=userName+extension
    if (file == None):
      uploadPath = 'NULL'
    else:
      uploadPath = os.path.join("/home/happy/identifyImage", filename)
      file.save(uploadPath)
    userName=request.form.get('userName')
    realName=(request.form.get('realName'))
    institude=request.form.get('institude')
    Email=request.form.get('Email')
    Password1=request.form.get('Password1')
    identity=request.form.get('identity')

    try:
      query='INSERT INTO user(name,realName,organization,email,password,identity,filePath) VALUES \
      ("'+userName+'","'+realName+'","'+institude+'", "'+Email+'","'+Password1+'", "'+identity+'","'+uploadPath+'")'
      print('register:'+query)
      engine.execute(query)
    except:
      return send_file('./templates/registerFail.html')
    else:
      return send_file('./templates/index.html')
    finally:
      pass

@zc.route('/registConference',methods=['POST'])
def registConference():
  if request.method == 'POST':
    data = getParam((request.get_data()).decode())
    print(data)
    try:
      engine.execute(insertDB(data,'conference'))
      ret=getID(data,'conference')
      print(ret)
    except:
      return jsonify({"result":0})
    else:
      return jsonify({"result":ret[0][0]})
    finally:
      pass

#insert into user(name,realName,organization,email,password,identity,filePath) values ('1','<>','1','1','1','1','1');
@zc.route('/search/<searchKey>',methods=['GET'])
def search(searchKey):
  if(request.method=='GET'):
    try:
      searchKey=str(searchKey)
      conferences=getSearchResult(searchKey,'conference')
      print(conferences)
      #if(conferences==[]):
        #return jsonify({"result":0})
    except:
      return jsonify({"result":0})
    else:
      result={}
      jsonData=[]
      for confer in conferences:
        result['conferenceName']=confer[2]
        result['startTime']=confer[4]
        result['endTime']=confer[5]
        result['location']=confer[6]
        result['abstract']=confer[11]
        jsonData.append(result)

      print(jsonData)
      jsonData=json.dumps(jsonData,ensure_ascii=False)
      return jsonData
    finally:
      pass

