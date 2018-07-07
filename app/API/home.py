from sqlalchemy import create_engine
from flask  import Flask,request,session,g,redirect,url_for,Blueprint,jsonify
import json
import traceback
import urllib.parse

# pymysql://root:123456@192.168.168.231:3306/test
# 连接数据库的模块：//用户名:密码@ip:端口/数据库
engine = create_engine("mysql+pymysql://root:123@localhost:3306/happy?charset=utf8")

home = Blueprint('home', __name__)


def check(sonName):
    strName=str(sonName)
    queryStr='select * from user where name= '+'\''+strName+'\''
    #print(queryStr)
    result=engine.execute(queryStr)
    #print('testByCL4')
    ret=result.fetchall()
    if(len(ret)==0):
        return True
    else:
        return False


def getParam(str):
    keyValue = str.split("&")
    obj = {}
    for index in keyValue:
        item = index.split("=")
        obj[item[0]] = item[1]
    return obj


def getALLfromDB(db):
    queryStr = 'select * from ' + db + ' order by startTime desc'
    #print(queryStr)
    result = engine.execute(queryStr)
    ret = result.fetchall()
    jsonData = []
    # 循环读取元组数据
    # 将元组数据转换为列表类型，每个条数据元素为字典类型:[{'字段1':'字段1的值','字段2':'字段2的值',...,'字段N:字段N的值'},{第二条数据},...,{第N条数据}]
    for row in ret[:5]:
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
        result['abstract'] = row[12]
        result['ownerPeopleName'] = row[13]
        result['ownerPeopleTel'] = row[14]
        result['ownerPeopleEmail'] = row[15]
        result['contributionStartTime'] = str(row[16])
        result['contributionEndTime'] = str(row[17])
        result['contributionTheme'] = str(row[18])
        result['contributionAbstract'] = row[19]
        result['authorPrice'] = row[20]
        result['registerStartTime'] = row[21]
        result['registerEndTime'] = row[22]
        result['schedule'] = row[23]
        result['hotelAndTraffic'] = row[24]
        jsonData.append(result)
        #print(jsonData)
    return jsonData


@home.route('/getNewConference', methods=['GET'])
def returnNewC():
    if request.method == 'GET':
        try:
            # print('hello')
            res = getALLfromDB('conference')
            # print(res)
            jsondatar = json.dumps(res, ensure_ascii=False)
            # print(jsondatar)
        except:
            #traceback.print_exc()
            return jsonify({"result": 0})
        else:
            return jsondatar


def getNums():
    queryStr = "select count(*) from conference"
    #print(queryStr)
    result = engine.execute(queryStr)
    rett = result.fetchall()
    #print(rett[0][0])
    num = rett[0][0]
    return num


@home.route("/getConfernum", methods=['GET'])
def returnNum():
    if request.method == 'GET':
        try:
            ress = getNums()
            ans = jsonify(num=ress)
        except:
            traceback.print_exc()
            return jsonify({"result": 0})
        else:
            return ans


@home.route('/getUserIfSubPaper/<userId>/<confId>', methods=['GET'])
def getIfPaper(userId, confId):
    if (request.method == 'GET'):
        queryStr = 'select * from attendConference where userID= ' + userId + ' and conferenceID= ' + confId
        result = engine.execute(queryStr)
        ret = result.fetchall()
        length = len(ret)
        if (length == 0):
            return jsonify({'result': 0})
        else:
            return jsonify({'result': 1})

@home.route("/getIfPaper/<userId>/<confId>", methods=['GET'])
def getIfSubPaper(userId, confId):
    if request.method == 'GET':
        try:
            queryStr = 'select * from contribution where userID= ' + userId + ' and conferenceID= ' + confId
            result = engine.execute(queryStr)
            ret = result.fetchall()
            if(len(ret)==0):
                return jsonify({'result':0})
            else:
                return jsonify({'result': 1})
        except:
            return jsonify({'result':-1})



@home.route("/getPapers/<userId>/<confId>", methods=['GET'])
def getPaper(userId, confId):
    if request.method == 'GET':
        try:
            queryStr = 'select * from contribution where userID= ' + userId + ' and conferenceID= ' + confId
            result = engine.execute(queryStr)
            ret = result.fetchall()
            jsonData = []
            if(len(ret)==0):
                return jsonify({'result':0})
            for row in ret:
                result = {}
                result['authorList'] = row[4]
                result['title'] = row[5]
                result['checkStatus'] = row[7]
                result['contributionStatus'] = row[8]
                jsonData.append(result)
                #print(jsonData)
            jsondatar = json.dumps(jsonData, ensure_ascii=False)
        except:
            traceback.print_exc()
            return jsonify({"result": 0})
        else:
            return jsondatar


@home.route("/getPaperInfo/<id>/<cid>", methods=['GET'])
def getPaper2(id,cid):
    if request.method == 'GET':
        try:
            queryStr = 'select * from contribution where userID= ' + str(id)+ ' and conferenceID= '+ str(cid)
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
                #print(jsonData)
            jsondatar = json.dumps(jsonData, ensure_ascii=False)
        except:
            traceback.print_exc()
            return jsonify({"result": 0})
        else:
            return jsondatar


@home.route("/addSon",methods=['GET','POST'])
def addSon():
    #print('hi')
    if request.method == 'POST':
        #print('hello')
        try:
            data = getParam((request.get_data()).decode('UTF-8'))
            #print('cltest1')
            #print(data)
            #print('cltest2')
            sonName = urllib.parse.unquote(data['sonName'])
            password = urllib.parse.unquote(data['password'])
            userFatherId = data['userFatherId']
            organization = urllib.parse.unquote(data['organization'])
            email = urllib.parse.unquote(data['email'])
            print(sonName, password)
            flag = check(sonName)
            if (flag == False):
                return jsonify({"result": 0})
            print('after')
            queryStr = 'insert into user (name,realName,password,fatherId,organization,email,identity) values ' \
                       + '("' + sonName + '","","' + password + '",' + str(
                userFatherId) + ',"' + organization + '","' + email + '",3)'
            print("addson query", queryStr)
            result = engine.execute(queryStr)
        except:
            #traceback.print_exc()
            return jsonify({"result": -1})
        else:
            return jsonify({"result":1})


@home.route("/getSonsId/<userId>", methods=['GET'])
def getSonsId(userId):
    if request.method == 'GET':
        try:
            userId = str(userId)
            queryStr = 'select * from user where fatherId= ' + userId
            result = engine.execute(queryStr)
            ret = result.fetchall()
            jsonData = []
            for row in ret:
                result = {}
                result['name'] = row[1]
                result['organization'] = row[3]
                result['email'] = row[4]
                result['password'] = row[5]
                jsonData.append(result)
            jsondatar = json.dumps(jsonData, ensure_ascii=False)

        except:
            return jsonify({"result": 0})
        else:
            return jsondatar
