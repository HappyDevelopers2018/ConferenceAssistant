# -*- coding: utf-8 -*-
#!/usr/local/bin/python -u
from sqlalchemy import create_engine
from flask import Flask, request, session, g, redirect, url_for, Blueprint, jsonify, send_file, render_template
import json
from werkzeug.utils import secure_filename
import os
import urllib.parse

# 连接数据库的模块�?/用户�?密码@ip:端口/数据�?
engine = create_engine("mysql+pymysql://root:123@localhost:3306/happy?charset=utf8")

userAPI = Blueprint('userAPI', __name__)


def getNextID(db):
    queryStr = 'select MAX(id) from ' + db
    result = engine.execute(queryStr)
    ret = result.fetchall()
    if ret[0][0]==None:
        return 1
    return ret[0][0] + 1


def getFromSQL(db,targets,conditions,logic):
    queryStr='select '
    l=len(targets)
    for target in targets:
        l-=1
        queryStr+=target
        if l>0:
            queryStr+=','
    queryStr+=' from '+db+' where '
    l=len(conditions)
    for condition in conditions:
        queryStr+=condition+'="'+str(conditions[condition])+'"'
        if l>0:
            queryStr+=' '+logic+' '
    result=engine.execute(queryStr)
    ret=result.fetchall()
    return ret

def insertDB(obj, db):
    queryStr = 'insert into ' + db + '('
    queryStr2 = ') values ('
    l = len(obj)
    for each in obj:
        l -= 1
        # print(each, urllib.parse.unquote(obj[each]))
        queryStr += each
        queryStr2 += '"' + urllib.parse.unquote(obj[each]) + '"'
        if l > 0:
            queryStr += ','
            queryStr2 += ','

    queryStr = queryStr + queryStr2 + ')'
    # print(queryStr)
    return queryStr

# @userAPI.route('/zctestAPI',methods=['GET','POST'])
# def zctestAPI():
#     realName=getFromSQL('user',['realName'],{'id':121},'')
#     print('realName:',realName)
#     return jsonify({'result':realName[0][0]})

@userAPI.route('/getAttendConferenceList/<id>', methods=['GET'])
def getAttendConferenceList(id):
    result = engine.execute('select distinct conferenceID from attendConference where userID=' + id)
    result = result.fetchall()
    ret = []
    for item in result:
        # print(item[0])
        tmp = engine.execute(
            'select conferenceName,startTime,endTime,abstract from conference where id=' + str(item[0]))
        tmp = tmp.fetchall()
        for row in tmp:
            tmpCol = {}
            tmpCol['id'] = item[0]
            tmpCol['conferenceName'] = row[0]
            tmpCol['startTime'] = row[1]
            tmpCol['endTime'] = row[2]
            filepath1 = '/home/happy/abstractTxt/' + str(row[3])
            f1 = open(filepath1, 'r')
            tmpCol['abstract'] = (f1.read())
            f1.close()
            ret.append(tmpCol)
    # print(ret)
    return json.dumps(ret, ensure_ascii=False)


@userAPI.route('/attendConference/<userID>/<conferenceID>', methods=['GET'])
def attendConference(userID, conferenceID):
    try:
        engine.execute(insertDB({'userID': userID, 'conferenceID': conferenceID}, 'attendConference'))
    except:
        return jsonify({"result": 0})
    else:
        return jsonify({"result": 1})

@userAPI.route('/userContribute/<userId>/<conferenceId>/<autherList>', methods=['POST'])
def userContribute(userId,conferenceId,autherList):
    # print("userContribute")
    if request.method == 'POST':
        #判断是否作者之一
        realName=getFromSQL('user',['realName'],{'id':userId},'')
        # print('realName:',realName)
        if realName==[] or autherList.find(realName[0][0])==-1:
            return jsonify({"result": -1})
        contributionID = getNextID('contribution')
        # print(contributionID)
        # print(userId,conferenceId,autherList)
        title = request.form.get('title')
        abstract = request.form.get('abstract')
        # print("userContribute:", title, abstract)
        file = request.files['file']
        filename=file.filename
        # print(filename)
        filename=str(contributionID)+"_"+filename
        if (file == None):
            uploadPath = 'NULL'
        else:
            uploadPath = os.path.join("/home/happy/contribution", filename)
            file.save(uploadPath)
        # print(uploadPath)
        try:
            query = 'INSERT INTO contribution VALUES('+str(contributionID)+','+str(userId)+','+str(conferenceId)+',"'+uploadPath+'","'+autherList+'","'+title+'","'+abstract+'",3,0,"")'
            # print('register:' + query)
            engine.execute(query)
        except:
            return jsonify({"result": 0})
        else:
            return jsonify({"result": 1})

@userAPI.route('/updateContribution/<contributionID>',methods=['POST'])
def updateContribution(contributionID):
    if request.method=='POST':
        file = request.files['file']
        filename=file.filename
        # print(filename)
        filename=str(contributionID)+"_"+filename
        if (file == None):
            uploadPath = 'NULL'
        else:
            uploadPath = os.path.join("/home/happy/contribution", filename)
            file.save(uploadPath)
        # print(uploadPath)
        try:
            engine.execute('update contribution set filePath="'+uploadPath+'",checkStatus=3 where id='+str(contributionID))
        except:
            return jsonify({"result": 0})
        else:
            return jsonify({"result": 1})

