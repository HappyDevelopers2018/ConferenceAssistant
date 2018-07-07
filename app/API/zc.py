#-*- coding: utf-8 -*-

from sqlalchemy import create_engine
from flask  import Flask,request,session,g,redirect,url_for,Blueprint,jsonify,send_file,render_template
import os
from werkzeug.utils import secure_filename
import json
import urllib.parse
import traceback
# 连接数据库的模块：//用户名:密码@ip:端口/数据库
engine = create_engine("mysql+pymysql://root:123@localhost:3306/happy?charset=utf8")

zc = Blueprint('zc', __name__)
def getSearchResult(str,db):
  str=urllib.parse.unquote(str)
  queryStr='select * from '+ db+' where conferenceName like '+'"%%'+str+'%%" or shortName like '\
  +'"%%'+str+'%%"'+' or abstract like '+'"%%'+str+'%%"'\
  +' or contributionTheme like '+'"%%'+str+'%%"'
  # queryStr = 'select * from '+db+' where conferenceName = \''+urllib.parse.unquote(str)+'\''
  print(queryStr)
  try:
    result=engine.execute(queryStr)
  except:
    traceback.print_exc()
    return []
  ret=result.fetchall()
  print("search",ret)
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

def getNextID(db):
    queryStr = 'select MAX(id) from ' + db
    result = engine.execute(queryStr)
    ret = result.fetchall()
    if ret[0][0]==None:
        return 1
    return ret[0][0] + 1

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

def insertDBId(id,obj,db):
  queryStr='insert into '+db+' values ('+str(id)+','
  l=len(obj)
  for each in obj:
    l-=1
    queryStr+='"'+urllib.parse.unquote(obj[each])+'"'
    if l>0:
      queryStr+=','

  queryStr=queryStr+')'
  print(queryStr)
  return queryStr

def save2Txt(content,filename,path='/home/happy/abstractTxt/'):
  try:
    f = open(path+filename,'w')
    f.write(content)
    f.close()
  except:
    return 0
  else:
    return 1

# @zc.route('/testAPI',methods=['POST','GET'])
# def testAPI():
#     return jsonify({"result":getNextID('conference')})

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
    if(filename==None or filename==""):
      return jsonify({"result":-1})
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
      return jsonify({"result": 0})
      # return send_file('./templates/registerFail.html')
    else:
      return jsonify({"result": 1})
      # return send_file('./templates/index.html')

#测试时候去除try方便debug
@zc.route('/registConference',methods=['POST'])
def registConference():
  if request.method == 'POST':
    data = getParam((request.get_data()).decode())
    print(data)
    try:
      id=getNextID('conference')
      print("rcf1")
      file=str(id)+'_abstract.txt'
      save2Txt(data['abstract'],file)
      data['abstract']=file

      file=str(id)+'_contributionAbstract.txt'
      save2Txt(data['contributionAbstract'],file)
      data['contributionAbstract']=file


      file=str(id)+'_schedule.txt'
      save2Txt(data['schedule'],file)
      data['schedule']=file


      file=str(id)+'_hotelAndTraffic.txt'
      save2Txt(data['hotelAndTraffic'],file)
      data['hotelAndTraffic']=file

      print("rcf2")
      engine.execute(insertDB(data,'conference'))
      print("rcf3")
      ret=getID(data,'conference')
      print(ret)
    except:
      return jsonify({"result":0})
    else:
      return jsonify({"result":ret[0][0]})

#insert into user(name,realName,organization,email,password,identity,filePath) values ('1','<>','1','1','1','1','1');
@zc.route('/search/',methods=['GET','POST'])
def search():
  data = getParam((request.get_data()).decode())
  print(data)
  key=data['key']
  if(request.method=='POST'):
    print(key)
    try:
      key=str(key)
      conferences=getSearchResult(key,'conference')
      print("searchResult",conferences)
      if(conferences==[]):
        return jsonify({"result":0})
    except:
      traceback.print_exc()
      return jsonify({"result":0})
    else:
      result={}
      jsonData=[]

      #print(len(conferences))
      for confer in conferences:
        result={}
        result['id']=confer[0]
        result['conferenceName']=confer[2]
        result['startTime']=confer[4]
        result['endTime']=confer[5]
        result['location']=confer[6]
        result['organizer']=str(confer[9])
        jsonData.append(result)
      #print(jsonData)
      jsonData=json.dumps(jsonData,ensure_ascii=False)
      return jsonData
    finally:
      pass

