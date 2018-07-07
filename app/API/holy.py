import datetime
import os
import traceback
from sqlalchemy import create_engine
from flask import Flask, request, session, g, redirect, url_for, Blueprint, jsonify, send_file, send_from_directory, \
    make_response
import json

# pymysql://root:123456@192.168.168.231:3306/test
# 连接数据库的模块：//用户名:密码@ip:端口/数据库
engine = create_engine("mysql+pymysql://root:123@localhost:3306/happy?charset=utf8")

holy = Blueprint('holy', __name__)


def changeALLRead(id, db):
    queryS = 'update ' + db + ' set isRead = 1 where useID = ' + str(id)
    # print(queryS)
    res = engine.execute(queryS)
    # print(res)
    jsonData = []
    result = {}
    result['result'] = 1
    jsonData.append(result)
    return jsonData


def countMessage(id, db):
    today = str(datetime.date.today()+datetime.timedelta(days = 10))
    queryS = 'select count(*) from ' + db + ' where userID=' + str(id) + ' and isRead=0 and type>1 and time<'+"'"+str(today)+"'"
    print('>> CountMessageLog: '+queryS)
    result = engine.execute(queryS)
    ret = result.fetchall()
    # print(ret)
    jsonData = []
    for row in ret:
        result = {}
        result['count'] = row[0]
        jsonData.append(result)
    # print(jsonData)
    return jsonData


def deleteMessage(id, db):
    queryS = 'delete from ' + db + ' where id = ' + str(id)
    # print(queryS)
    engine.execute(queryS)
    jsonData = []
    jsonData.append({'result': 1})
    return jsonData


def changeRead(id, db):
    queryS = 'update ' + db + ' set isRead = 1 where id = ' + str(id)
    # print(queryS)
    res = engine.execute(queryS)
    # print(res)
    jsonData = []
    result = {}
    result['result'] = 1
    jsonData.append(result)
    return jsonData


def getALLMessages(id, db):
    queryS = 'select * from ' + db + ' where userID=' + str(id) + ' order by isRead, time'
    # print(queryS)
    result = engine.execute(queryS)
    ret = result.fetchall()
    # print(ret)
    today = str(datetime.date.today()+datetime.timedelta(days = 10))
    # today = today.replace('-0','-')
    # print('today:' + today)
    jsonData = []
    for row in ret:
        result = {}
        result['id'] = row[0]
        result['userID'] = row[1]
        result['conferenceID'] = row[2]
        result['content'] = row[3]
        result['time'] = row[4]
        result['isRead'] = row[5]
        result['type'] = row[6]

        # print(today)
        time = str(result['time'])
        # time = time.replace('-0','-')
        # print(time)
        if time <= today:
            jsonData.append(result)
    # print(jsonData)
    return jsonData


def getALLfromContribution(id, db):
    queryS = 'select * from ' + db + ' where userID=' + str(id)
    result = engine.execute(queryS)
    ret = result.fetchall()
    # print(ret)
    jsonData = []
    for row in ret:
        result = {}
        result['id'] = row[0]
        result['userID'] = row[1]
        result['conferenceID'] = row[2]
        cid = row[2]
        # print(cid)
        sname = "未知会议"
        try:
            querySt = 'select conferenceName from conference where id=' + str(cid)
            # print(querySt)
            resName = engine.execute(querySt)
            resname = resName.fetchall()
            for row1 in resname:
                sname = row1[0]
            # print(sname)

        except:
            pass
        finally:
            # print(sname)
            result['conferenceName'] = sname
            result['filePath'] = row[3]
            result['authorList'] = row[4]
            result['title'] = row[5]
            result['abstract'] = row[6]
            result['checkStatus'] = row[7]
            result['contributionStatus'] = row[8]
            result['modificationAdvise'] = row[9]
            jsonData.append(result)
    # print(jsonData)
    return jsonData


def getAllContributions(id, db):
    queryS = 'select * from ' + db + ' where conferenceID=' + str(id)
    result = engine.execute(queryS)
    ret = result.fetchall()
    # print(ret)
    jsonData = []
    for row in ret:
        result = {}
        result['id'] = row[0]
        result['userID'] = row[1]
        result['conferenceID'] = row[2]
        result['filePath'] = row[3]
        result['authorList'] = row[4]
        result['title'] = row[5]
        result['abstract'] = row[6]
        result['checkStatus'] = row[7]
        result['contributionStatus'] = row[8]
        result['modificationAdvise'] = row[9]
        jsonData.append(result)
    print(jsonData)
    return jsonData


def getRejectOrg(db):
    queryS = 'select * from ' + db + ' where identity=4'
    result = engine.execute(queryS)
    ret = result.fetchall()
    # print(ret)
    jsonData = []
    for row in ret:
        result = {}
        result['id'] = row[0]
        result['name'] = row[1]
        result['realname'] = row[2]
        result['organization'] = row[3]
        result['email'] = row[4]
        result['identity'] = row[6]
        result['filepath'] = row[7]
        jsonData.append(result)
    # print(jsonData)
    return jsonData


def getAcRegisterOrg(db):
    queryS = 'select * from ' + db + ' where identity=3'
    result = engine.execute(queryS)
    ret = result.fetchall()
    # print(ret)
    jsonData = []
    for row in ret:
        result = {}
        result['id'] = row[0]
        result['name'] = row[1]
        result['realname'] = row[2]
        result['organization'] = row[3]
        result['email'] = row[4]
        result['identity'] = row[6]
        result['filepath'] = row[7]
        jsonData.append(result)
    # print(jsonData)
    return jsonData


def rejectIdentity(id, db):
    queryS = 'update ' + db + ' set identity = 4  where id= ' + str(id)
    # print(queryS)
    engine.execute(queryS)
    jsonData = []
    jsonData.append(1)
    return jsonData


def passIdentity(id, db):
    queryS = 'update ' + db + ' set identity = 3  where id=' + str(id)
    # print(queryS)
    engine.execute(queryS)
    jsonData = []
    jsonData.append(1)
    return jsonData


def getUnregisterOrg(db):
    queryS = 'select * from ' + db + ' where identity=2'
    result = engine.execute(queryS)
    ret = result.fetchall()
    # print(ret)
    jsonData = []
    for row in ret:
        result = {}
        result['id'] = row[0]
        result['name'] = row[1]
        result['realname'] = row[2]
        result['organization'] = row[3]
        result['email'] = row[4]
        result['identity'] = row[6]
        result['filepath'] = row[7]
        jsonData.append(result)
    # print(jsonData)
    return jsonData


def getCollectionByID(user_id, dbCon, dbCol):
    queryS = 'select conference_id from ' + dbCol + ' where user_id=' + str(user_id)
    result = engine.execute(queryS)
    ret = result.fetchall()
    # print(ret)
    conferences = []
    for row in ret:
        conferences.append(row[0])
    # print(conferences)
    jsonData = []
    for conference in conferences:
        queryStr = 'select * from ' + dbCon + ' where id=' + str(conference)
        # print(queryStr)
        res = engine.execute(queryStr)
        resu = res.fetchall()
        # print(resu)
        for row in resu:
            resut = {}
            resut['id'] = row[0]
            resut['conferenceName'] = row[2]
            resut['startTime'] = str(row[4])
            resut['endTime'] = str(row[5])
            resut['location'] = row[7]
            resut['abstract'] = row[12]
            jsonData.append(resut)
    # print(jsonData)
    return jsonData


def getALLfromUsername(name, db):
    queryS = 'select * from ' + db + ' where name= \'' + str(name) + '\''
    # print(queryS)
    result = engine.execute(queryS)
    ret = result.fetchall()
    # print(ret)
    jsonData = []
    for row in ret:
        result = {}
        result['id'] = row[0]
        result['name'] = row[1]
        result['realname'] = row[2]
        result['organization'] = row[3]
        result['email'] = row[4]
        result['identity'] = row[6]
        result['filepath'] = row[7]
        jsonData.append(result)
    # print(jsonData)
    return jsonData


def getALLfromUser(id, db):
    queryS = 'select * from ' + db + ' where id=' + str(id)
    # print(queryS)
    result = engine.execute(queryS)
    ret = result.fetchall()
    # print(ret)
    jsonData = []
    for row in ret:
        result = {}
        result['id'] = row[0]
        result['name'] = row[1]
        result['realname'] = row[2]
        result['organization'] = row[3]
        result['email'] = row[4]
        result['identity'] = row[6]
        result['filepath'] = row[7]
        jsonData.append(result)
    # print(jsonData)
    return jsonData


def getALLConferenceByCreatorID(id, db):
    queryStr = 'select * from ' + db + ' where creatorID=' + id

    # print(queryStr)
    result = engine.execute(queryStr)
    ret = result.fetchall()
    jsonData = []

    # 循环读取元组数据
    # 将元组数据转换为列表类型，每个条数据元素为字典类型:[{'字段1':'字段1的值','字段2':'字段2的值',...,'字段N:字段N的值'},{第二条数据},...,{第N条数据}]
    for row in ret:
        result = {}
        result['id'] = row[0]
        result['conferenceName'] = row[2]
        result['startTime'] = str(row[4])
        result['endTime'] = str(row[5])
        result['location'] = row[7]
        filepath1 = '/home/happy/abstractTxt/' + row[12]
        f1 = open(filepath1, 'r')
        result['abstract'] = (f1.read())
        f1.close()
        jsonData.append(result)
        # print(jsonData)
    return jsonData


def getALLfromDB(id, db):
    queryStr = 'select * from ' + db + ' where id=' + str(id)

    print(queryStr)
    result = engine.execute(queryStr)
    ret = result.fetchall()
    jsonData = []
    # 循环读取元组数据
    # 将元组数据转换为列表类型，每个条数据元素为字典类型:[{'字段1':'字段1的值','字段2':'字段2的值',...,'字段N:字段N的值'},{第二条数据},...,{第N条数据}]
    for row in ret:
        result = {}
        result['id'] = row[0]
        result['creatorID'] = row[1]
        result['conferenceName'] = row[2]
        result['shortname'] = row[3]
        result['startTime'] = str(row[4])
        result['endTime'] = str(row[5])
        result['city'] = row[6]
        result['location'] = row[7]
        result['ownerOrganization'] = row[8]
        result['supporter'] = row[9]
        result['organizer'] = str(row[10])
        result['site'] = row[11]
        filepath1 = '/home/happy/abstractTxt/' + str(row[12])
        # print(filepath1)
        f1 = open(filepath1, 'r')
        result['abstract'] = (f1.read())
        f1.close()
        result['ownerPeopleName'] = row[13]
        result['ownerPeopleTel'] = row[14]
        result['ownerPeopleEmail'] = row[15]
        result['contributionStartTime'] = str(row[16])
        result['contributionEndTime'] = str(row[17])
        result['contributionTheme'] = str(row[18])
        filepath2 = '/home/happy/abstractTxt/' + str(row[19])
        # print(filepath2)
        f2 = open(filepath2, 'r')
        result['contributionAbstract'] = f2.read()
        f2.close()
        result['authorPrice'] = row[20]
        result['registerStartTime'] = row[21]
        result['registerEndTime'] = row[22]
        filepath3 = '/home/happy/abstractTxt/' + str(row[23])
        f3 = open(filepath3, 'r')
        result['schedule'] = f3.read()
        f3.close()
        filepath4 = '/home/happy/abstractTxt/' + str(row[24])
        f4 = open(filepath4, 'r')
        result['hotelAndTraffic'] = f4.read()
        f4.close()
        jsonData.append(result)
    return jsonData


@holy.route('/returnConference/<id>', methods=['GET'])
def returnCon(id):
    if request.method == 'GET':
        try:
            # print("hello")
            res = getALLfromDB(id, 'conference')
            jsondatar = json.dumps(res, ensure_ascii=False)
            #   engine.execute(
            # "INSERT INTO user(name,organization,email,password,identity,realName,filePath) \
            # VALUES (%(name)s,%(realName)s,%(organization)s,%(email)s,%(password)s, %(identity)s,%(filePath)s,)",
            # name=data['name'],realName=data['realName'],
            # organization=data['organization'],email=data['email'],
            # password=data['password'],identity=data['identity'],
            # filePath=data['filePath']
            # )
        except:
            return jsonify({"result": 0})
        else:
            # return jsonify({"result":1})
            return jsondatar


@holy.route('/returnUser/<id>', methods=['GET'])
def returnUser(id):
    if request.method == 'GET':
        try:

            res = getALLfromUser(id, 'user')
            jsondatar = json.dumps(res, ensure_ascii=False)
            # print(jsondatar)
            #   engine.execute(
            # "INSERT INTO user(name,organization,email,password,identity,realName,filePath) \
            # VALUES (%(name)s,%(realName)s,%(organization)s,%(email)s,%(password)s, %(identity)s,%(filePath)s,)",
            # name=data['name'],realName=data['realName'],
            # organization=data['organization'],email=data['email'],
            # password=data['password'],identity=data['identity'],
            # filePath=data['filePath']
            # )
        except:
            return jsonify({"result": 0})
        else:
            # return jsonify({"result":1})
            return jsondatar


@holy.route('/userConference/<id>', methods=['GET'])
def returnConferenceByUserID(id):
    if request.method == 'GET':
        try:
            res = getALLConferenceByCreatorID(id, 'conference')
            jsondatar = json.dumps(res, ensure_ascii=False)
            # print(jsondatar)
            #   engine.execute(
            # "INSERT INTO user(name,organization,email,password,identity,realName,filePath) \
            # VALUES (%(name)s,%(realName)s,%(organization)s,%(email)s,%(password)s, %(identity)s,%(filePath)s,)",
            # name=data['name'],realName=data['realName'],
            # organization=data['organization'],email=data['email'],
            # password=data['password'],identity=data['identity'],
            # filePath=data['filePath']
            # )
        except:
            return jsonify({"result": 0})
        else:
            # return jsonify({"result":1})
            return jsondatar


@holy.route('/userCollection/<id>', methods=['GET'])
def returnCollectionByUserID(id):
    if request.method == 'GET':
        try:
            res = getCollectionByID(id, 'conference', 'userCollection')
            # print(1)
            # print(res)

            jsondatar = json.dumps(res, ensure_ascii=False)
            # print(jsondatar)
            #   engine.execute(
            # "INSERT INTO user(name,organization,email,password,identity,realName,filePath) \
            # VALUES (%(name)s,%(realName)s,%(organization)s,%(email)s,%(password)s, %(identity)s,%(filePath)s,)",
            # name=data['name'],realName=data['realName'],
            # organization=data['organization'],email=data['email'],
            # password=data['password'],identity=data['identity'],
            # filePath=data['filePath']
            # )
        except:
            return jsonify({"result": 0})
        else:
            # return jsonify({"result":1})
            return jsondatar


@holy.route('/userInfo/<name>', methods=['GET'])
def returnUserByUserName(name):
    if request.method == 'GET':
        try:
            res = getALLfromUsername(name, 'user')
            print(1)
            # print(res)

            jsondatar = json.dumps(res, ensure_ascii=False)
            # print(jsondatar)
            #   engine.execute(
            # "INSERT INTO user(name,organization,email,password,identity,realName,filePath) \
            # VALUES (%(name)s,%(realName)s,%(organization)s,%(email)s,%(password)s, %(identity)s,%(filePath)s,)",
            # name=data['name'],realName=data['realName'],
            # organization=data['organization'],email=data['email'],
            # password=data['password'],identity=data['identity'],
            # filePath=data['filePath']
            # )
        except:
            return jsonify({"result": 0})
        else:
            # return jsonify({"result":1})
            return jsondatar


@holy.route('/returnOrganization', methods=['GET'])
def returnOrganization():
    if request.method == 'GET':
        try:
            res = getUnregisterOrg('user')
            jsondatar = json.dumps(res, ensure_ascii=False)
            # print(jsondatar)
            #   engine.execute(
            # "INSERT INTO user(name,organization,email,password,identity,realName,filePath) \
            # VALUES (%(name)s,%(realName)s,%(organization)s,%(email)s,%(password)s, %(identity)s,%(filePath)s,)",
            # name=data['name'],realName=data['realName'],
            # organization=data['organization'],email=data['email'],
            # password=data['password'],identity=data['identity'],
            # filePath=data['filePath']
            # )
        except:
            return jsonify({"result": 0})
        else:
            # return jsonify({"result":1})
            return jsondatar


@holy.route('/passIdentity/<id>', methods=['GET'])
def passIdentiy(id):
    if request.method == 'GET':
        try:
            res = passIdentity(id, 'user')
            jsondatar = json.dumps(res, ensure_ascii=False)
            # print(jsondatar)
            #   engine.execute(
            # "INSERT INTO user(name,organization,email,password,identity,realName,filePath) \
            # VALUES (%(name)s,%(realName)s,%(organization)s,%(email)s,%(password)s, %(identity)s,%(filePath)s,)",
            # name=data['name'],realName=data['realName'],
            # organization=data['organization'],email=data['email'],
            # password=data['password'],identity=data['identity'],
            # filePath=data['filePath']
            # )
        except:
            return jsonify({"result": 0})
        else:
            # return jsonify({"result":1})
            return jsondatar


@holy.route('/rejectIdentity/<id>', methods=['GET'])
def rejectIdentiy(id):
    if request.method == 'GET':
        try:
            res = rejectIdentity(id, 'user')
            jsondatar = json.dumps(res, ensure_ascii=False)
            # print(jsondatar)
            #   engine.execute(
            # "INSERT INTO user(name,organization,email,password,identity,realName,filePath) \
            # VALUES (%(name)s,%(realName)s,%(organization)s,%(email)s,%(password)s, %(identity)s,%(filePath)s,)",
            # name=data['name'],realName=data['realName'],
            # organization=data['organization'],email=data['email'],
            # password=data['password'],identity=data['identity'],
            # filePath=data['filePath']
            # )
        except:
            return jsonify({"result": 0})
        else:
            # return jsonify({"result":1})
            return jsondatar


@holy.route('/download/<filename>', methods=['GET'])
def download(filename):
    # pls = path.split('/')
    # fname = pls[-1]
    fname = filename
    # print(fname)
    response = make_response(send_from_directory('/home/happy/identifyImage/', fname, as_attachment=True))
    response.headers["Content-Disposition"] = "attachment; filename={}".format(fname.encode().decode('latin-1'))
    return response
    # return send_from_directory('/home/happy/identifyImage/',fname,as_attachment=True)


@holy.route('/returnACOrg', methods=['GET'])
def getACRegisterOrg():
    if request.method == 'GET':
        try:
            res = getAcRegisterOrg('user')
            jsondatar = json.dumps(res, ensure_ascii=False)
            # print(jsondatar)
        #   engine.execute(
        # "INSERT INTO user(name,organization,email,password,identity,realName,filePath) \
        # VALUES (%(name)s,%(realName)s,%(organization)s,%(email)s,%(password)s, %(identity)s,%(filePath)s,)",
        # name=data['name'],realName=data['realName'],
        # organization=data['organization'],email=data['email'],
        # password=data['password'],identity=data['identity'],
        # filePath=data['filePath']
        # )
        except:
            return jsonify({"result": 0})
        else:
            # return jsonify({"result":1})
            return jsondatar


@holy.route('/returnRejectOrg', methods=['GET'])
def getRejectionOrg():
    if request.method == 'GET':
        try:
            res = getRejectOrg('user')
            jsondatar = json.dumps(res, ensure_ascii=False)
            # print(jsondatar)
        #   engine.execute(
        # "INSERT INTO user(name,organization,email,password,identity,realName,filePath) \
        # VALUES (%(name)s,%(realName)s,%(organization)s,%(email)s,%(password)s, %(identity)s,%(filePath)s,)",
        # name=data['name'],realName=data['realName'],
        # organization=data['organization'],email=data['email'],
        # password=data['password'],identity=data['identity'],
        # filePath=data['filePath']
        # )
        except:
            return jsonify({"result": 0})
        else:
            # return jsonify({"result":1})
            return jsondatar


@holy.route('/returnALLContributions/<id>', methods=['GET'])
def getALLCont(id):
    if request.method == 'GET':
        try:
            res = getAllContributions(id, 'contribution')
            jsondatar = json.dumps(res, ensure_ascii=False)
            # print(jsondatar)
        #   engine.execute(
        # "INSERT INTO user(name,organization,email,password,identity,realName,filePath) \
        # VALUES (%(name)s,%(realName)s,%(organization)s,%(email)s,%(password)s, %(identity)s,%(filePath)s,)",
        # name=data['name'],realName=data['realName'],
        # organization=data['organization'],email=data['email'],
        # password=data['password'],identity=data['identity'],
        # filePath=data['filePath']
        # )
        except:
            return jsonify({"result": 0})
        else:
            # return jsonify({"result":1})
            return jsondatar


@holy.route('/registerNonConference/<userID>/<conferenceID>', methods=['POST'])
def register(userID, conferenceID):
    print("test 1")
    if request.method == 'POST':
        print("test 2")
        file = request.files['fileForm']
        filename = file.filename
        print(filename)
        filePathName, extension = os.path.splitext(filename)
        userName = request.form.get('newname')

        filename = userName + extension
        if (file == None):
            uploadPath = 'NULL'
        else:
            uploadPath = os.path.join("/home/happy/feeImage", filename)
            file.save(uploadPath)
        realName = userName
        tel = request.form.get('telForm')
        gender = request.form.get('gender')
        accom = request.form.get('accommodation')
        print(realName)
        print(gender)
        print(accom)
        print(tel)
        attend = '"' + str(realName) + ',' + str(tel) + ',' + str(gender) + ',' + str(accom) + '"'
        # print(attend)
        remarks = request.form.get('remarks')
        try:
            query = 'INSERT INTO attendConference(userID,conferenceID,contributionID,authorInformation,notAuthorInformation,filePath,remarks) VALUES\
             ('+ str(userID) + ',' + str(conferenceID) + ',0, null,' + attend + ',"' + uploadPath + '","' + remarks + '")'
            engine.execute(query)
            print('register:' + query)
        except:
            return jsonify({"result": 0})
        else:
            return jsonify({"result": 1})
            # return send_file('./templates/registerConference.html')

@holy.route('/returnContribution/<id>', methods=['GET'])
def returnCont(id):
    if request.method == 'GET':
        try:

            res = getALLfromContribution(id, 'contribution')
            jsondatar = json.dumps(res, ensure_ascii=False)
            # print(jsondatar)
            #   engine.execute(
            # "INSERT INTO user(name,organization,email,password,identity,realName,filePath) \
            # VALUES (%(name)s,%(realName)s,%(organization)s,%(email)s,%(password)s, %(identity)s,%(filePath)s,)",
            # name=data['name'],realName=data['realName'],
            # organization=data['organization'],email=data['email'],
            # password=data['password'],identity=data['identity'],
            # filePath=data['filePath']
            # )
        except:
            return jsonify({"result": 0})
        else:
            # return jsonify({"result":1})
            return jsondatar


@holy.route('/returnMessages/<id>', methods=['GET'])
def returnMess(id):
    if request.method == 'GET':
        try:

            res = getALLMessages(id, 'message')
            jsondatar = json.dumps(res, ensure_ascii=False)
            # print(jsondatar)
            #   engine.execute(
            # "INSERT INTO user(name,organization,email,password,identity,realName,filePath) \
            # VALUES (%(name)s,%(realName)s,%(organization)s,%(email)s,%(password)s, %(identity)s,%(filePath)s,)",
            # name=data['name'],realName=data['realName'],
            # organization=data['organization'],email=data['email'],
            # password=data['password'],identity=data['identity'],
            # filePath=data['filePath']
            # )
        except:
            traceback.print_exc()
            return jsonify({"result": 0})
        else:
            # return jsonify({"result":1})
            return jsondatar


@holy.route('/changeRead/<id>', methods=['GET'])
def changeR(id):
    if request.method == 'GET':
        try:

            res = changeRead(id, 'message')
            jsondatar = json.dumps(res, ensure_ascii=False)
            # print(jsondatar)
            #   engine.execute(
            # "INSERT INTO user(name,organization,email,password,identity,realName,filePath) \
            # VALUES (%(name)s,%(realName)s,%(organization)s,%(email)s,%(password)s, %(identity)s,%(filePath)s,)",
            # name=data['name'],realName=data['realName'],
            # organization=data['organization'],email=data['email'],
            # password=data['password'],identity=data['identity'],
            # filePath=data['filePath']
            # )
        except:
            return jsonify({"result": 0})
        else:
            # return jsonify({"result":1})
            return jsondatar


@holy.route('/deleteMessage/<id>', methods=['GET'])
def deleteMess(id):
    if request.method == 'GET':
        try:

            res = deleteMessage(id, 'message')
            jsondatar = json.dumps(res, ensure_ascii=False)
            # print(jsondatar)
            #   engine.execute(
            # "INSERT INTO user(name,organization,email,password,identity,realName,filePath) \
            # VALUES (%(name)s,%(realName)s,%(organization)s,%(email)s,%(password)s, %(identity)s,%(filePath)s,)",
            # name=data['name'],realName=data['realName'],
            # organization=data['organization'],email=data['email'],
            # password=data['password'],identity=data['identity'],
            # filePath=data['filePath']
            # )
        except:            
            traceback.print_exc() 
            return jsonify({"result": 0})
        else:
            # return jsonify({"result":1})
            return jsondatar


@holy.route('/countMessage/<id>', methods=['GET'])
def countMess(id):
    print(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>> in func")
    if request.method == 'GET':
        try:

            res = countMessage(id, 'message')
            print(">>>>10")
            jsondatar = json.dumps(res, ensure_ascii=False)
            # print(jsondatar)
            #   engine.execute(
            # "INSERT INTO user(name,organization,email,password,identity,realName,filePath) \
            # VALUES (%(name)s,%(realName)s,%(organization)s,%(email)s,%(password)s, %(identity)s,%(filePath)s,)",
            # name=data['name'],realName=data['realName'],
            # organization=data['organization'],email=data['email'],
            # password=data['password'],identity=data['identity'],
            # filePath=data['filePath']
            # )
        except:
            traceback.print_exc() 
            return jsonify({"result": 0})
        else:
            # return jsonify({"result":1})
            return jsondatar


@holy.route('/changeALLRead/<userid>', methods=['GET'])
def changeALLR(userid):
    if request.method == 'GET':
        try:

            res = changeALLRead(userid, 'message')
            jsondatar = json.dumps(res, ensure_ascii=False)
            # print(jsondatar)
            #   engine.execute(
            # "INSERT INTO user(name,organization,email,password,identity,realName,filePath) \
            # VALUES (%(name)s,%(realName)s,%(organization)s,%(email)s,%(password)s, %(identity)s,%(filePath)s,)",
            # name=data['name'],realName=data['realName'],
            # organization=data['organization'],email=data['email'],
            # password=data['password'],identity=data['identity'],
            # filePath=data['filePath']
            # )
        except:
            return jsonify({"result": 0})
        else:
            # return jsonify({"result":1})
            return jsondatar


@holy.route('/registerConference/<userID>/<conferenceID>', methods=['POST'])
def registerC(userID, conferenceID):
    if request.method == 'POST':
        file = request.files['fileA']
        filename = file.filename
        filePathName, extension = os.path.splitext(filename)
        userName = request.form.get('nameA')

        filename = userName +"_"+str(conferenceID)+ extension
        if (file == None):
            uploadPath = 'NULL'
        else:
            uploadPath = os.path.join("/home/happy/feeImage", filename)
            file.save(uploadPath)
        realName = request.form.get('nameA')
        tel = request.form.get('telA')
        gender = request.form.get('genderA')
        accom = request.form.get('accommodationA')
        paperID = request.form.get('paperID')
        # print(realName)
        # print(gender)
        # print(accom)
        # print(tel)
        attend = '"' + str(realName) + ',' + str(tel) + ',' + str(gender) + ',' + str(accom) + '"'
        # print(attend)
        # userID = request.form.get('userID')
        # conferenceID = request.form.get('conferenceID')
        try:
            query = 'INSERT INTO attendConference(userID,conferenceID,contributionID,authorInformation,notAuthorInformation,filePath,remarks) VALUES \
      (' + str(userID) + ',' + str(conferenceID) + ',' + str(paperID) + ',' + attend + ',null,"' + uploadPath + '",null )'
            # print('register:' + query)
            engine.execute(query)
        except:
            return jsonify({"result": 0})
        else:
            return jsonify({"result": 1})
        finally:
            pass

@holy.route("/getPaperInfoById/<id>", methods=['GET'])
def getPaper2(id):
    if request.method == 'GET':
        try:
            queryStr = 'select * from contribution where id= ' + str(id)
            result = engine.execute(queryStr)
            ret = result.fetchall()
            jsonData = []
            for row in ret:
                result = {}
                result['id'] = row[0]
                #result['userID'] = row[1]
                #result['conferenceID'] = row[2]
                #result['filepath'] = row[3]
                result['authorList'] = row[4]
                result['title'] = row[5]
                #result['abstract'] = row[6]
                #result['checkStatus'] = row[7]
                #result['contributionStatus'] = row[8]
                #result['modificationAdvise'] = row[9]
                jsonData.append(result)
                # print(jsonData)
            jsondatar = json.dumps(jsonData, ensure_ascii=False)
        except:
            return jsonify({"result": 0})
        else:
            return jsondatar

