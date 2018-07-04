#-*- coding: utf-8 -*-

from sqlalchemy import create_engine
from flask  import Flask,request,session,g,redirect,url_for,Blueprint,jsonify,send_file,render_template
import json

import os
import urllib.parse
# 连接数据库的模块：//用户名:密码@ip:端口/数据库
engine = create_engine("mysql+pymysql://root:123@localhost:3306/happy?charset=utf8")

userAPI = Blueprint('userAPI', __name__)

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

@userAPI.route('/getAttendConferenceList/<id>',methods=['GET'])
def getAttendConferenceList(id):
    result=engine.execute('select conferenceID from attendConference where userID='+id)
    result=result.fetchall()
    ret=[]
    for item in result:
        print(item[0])
        tmp=engine.execute('select conferenceName,startTime,endTime,abstract from conference where id='+str(item[0]))
        tmp=tmp.fetchall()
        for row in tmp:
            tmpCol={}
            tmpCol['id']=item[0]
            tmpCol['name']=row[0]
            tmpCol['startTime']=row[1]
            tmpCol['endTime']=row[2]
            tmpCol['abstract']=row[3]
            ret.append(tmpCol)
    print(ret)
    return json.dumps(ret,ensure_ascii=False)

@userAPI.route('/userCollection/<id>',methods=['GET'])
def userCollection(id):
    pass

@userAPI.route('/attendConference/<userID>/<conferenceID>',methods=['GET'])
def attendConference(userID,conferenceID):
    try:
        engine.execute(insertDB({'userID':userID,'conferenceID':conferenceID},'attendConference'))
    except:
        return jsonify({"result":0})
    else:
        return jsonify({"result":1})

@userAPI.route('/userContribution/<id>',methods=['GET'])
def userContribution(id):
    pass
