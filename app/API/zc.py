#-*- coding: utf-8 -*-

from sqlalchemy import create_engine
from flask  import Flask,request,session,g,redirect,url_for,Blueprint,jsonify
import os
from werkzeug.utils import secure_filename
import json

# 连接数据库的模块：//用户名:密码@ip:端口/数据库
engine = create_engine("mysql+pymysql://root:nEXCruN1V5s1@localhost:3306/happy?charset=utf8")

zc = Blueprint('zc', __name__)

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
    queryStr+=each+'='+obj[each]
    if l>0:
      queryStr+=' and '
  print(queryStr)
  result = engine.execute(queryStr)
  ret = result.fetchall()
  return ret

def insertDB(obj,db):
  queryStr='insert into '+db+'('
  l=len(obj)
  for each in obj:
    l-=1
    queryStr+=each
    if l>0:
      queryStr+=','
  queryStr+=') values ('
  l=len(obj)
  for each in obj:
    l-=1
    queryStr+='"'+obj[each]+'"'
    if l>0:
      queryStr+=','
  queryStr+=')'
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

@zc.route('/login',methods=['POST'])
def login():
  if request.method == 'POST':
    data = getParam((request.get_data()).decode('UTF-8'))
    print(request.get_data())
    result = engine.execute('select id,identity from user where name="'+data['name']+'" and password="'+data['password']+'"')
    ret = result.fetchall()
    # return json.dumps(retArr,ensure_ascii=False)
    print(ret)
    if len(ret)==0:
      return jsonify({"result":ret})
    return jsonify({"result":ret[0][1],"id":ret[0][0]})

@zc.route('/register',methods=['POST'])
def register():
  if request.method == 'POST':
    file = request.files['file']
    if (file == None):
      uploadPath = 'NULL'
    else:
      basepath = os.path.dirname(__file__)
      uploadPath = os.path.join("/home/happy/identifyImage", secure_filename(file.filename))
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
      print(query)
      engine.execute(query)
    except:
      return jsonify({"result":0})
    else:
      return jsonify({"result":1})
    finally:
      pass

@zc.route('/registConference',methods=['POST'])
def registConference():
  if request.method == 'POST':
    data = getParam((request.get_data()).decode())
    print(data)
    try:
      result=engine.execute(insertDB(data,'conference'))
    except:
      return jsonify({"result":0})
    else:
      return jsonify({"result":1})
    finally:
      pass

#insert into user(name,realName,organization,email,password,identity,filePath) values ('1','<>','1','1','1','1','1');
