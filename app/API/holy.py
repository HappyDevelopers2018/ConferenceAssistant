from sqlalchemy import create_engine
from flask  import Flask,request,session,g,redirect,url_for,Blueprint,jsonify
import json
# pymysql://root:123456@192.168.168.231:3306/test
# 连接数据库的模块：//用户名:密码@ip:端口/数据库
engine = create_engine("mysql+pymysql://root:nEXCruN1V5s1@localhost:3306/happy?charset=utf8")

holy = Blueprint('holy', __name__)



def getCollectionByID(user_id,dbCon,dbCol):
    queryS = 'select conference_id from '+dbCol+' where user_id='+user_id
    result = engine.execute(queryS)
    ret = result.fetchall()
    print(ret)
    conferences = []
    for row in ret:
        conferences.append(row[0])
    print(conferences)
    jsonData = []
    for conference in conferences:
        queryStr='select * from '+dbCon+' where id='+str(conference)
        print(queryStr)
        res = engine.execute(queryStr)
        resu = res.fetchall()
        print(resu)
        for row in resu:
            resut = {}
            resut['id'] = row[0]
            resut['conferenceName'] = row[2]
            resut['startTime'] = str(row[4])
            resut['endTime'] = str(row[5])
            resut['location'] = row[6]
            resut['abstract'] = row[11]
            jsonData.append(resut)
    print(jsonData)
    return jsonData

def getALLfromUsername(name,db):
    queryS = 'select * from '+db+' where name= \''+str(name)+'\''
    print(queryS)
    result = engine.execute(queryS)
    ret = result.fetchall()
    print(ret)
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
    print(jsonData)
    return jsonData
def getALLfromUser(id,db):
    queryS = 'select * from '+db+' where id='+id
    print(queryS)
    result = engine.execute(queryS)
    ret = result.fetchall()
    print(ret)
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
    print(jsonData)
    return jsonData

def getALLConferenceByCreatorID(id,db):
      queryStr='select * from '+db+' where creatorID='+id

      '''
      l=len(obj)
      for each in obj:
            l-=1
            queryStr+=each+'='+obj[each]
            if l>0:
                  queryStr+=' and '
      print(queryStr)
      '''
      print(queryStr)
      result = engine.execute(queryStr)
      ret = result.fetchall()
      jsonData = []

        #循环读取元组数据
        #将元组数据转换为列表类型，每个条数据元素为字典类型:[{'字段1':'字段1的值','字段2':'字段2的值',...,'字段N:字段N的值'},{第二条数据},...,{第N条数据}]
      for row in ret:
          result = {}
          result['id'] = row[0]
          result['conferenceName'] = row[2]
          result['startTime'] = str(row[4])
          result['endTime'] = str(row[5])
          result['location'] = row[6]
          result['abstract'] = row[11]
          jsonData.append(result)
          print(jsonData)
      return jsonData

def getALLfromDB(id,db):
      queryStr='select * from '+db+' where id='+id

      '''
      l=len(obj)
      for each in obj:
            l-=1
            queryStr+=each+'='+obj[each]
            if l>0:
                  queryStr+=' and '
      print(queryStr)
      '''
      print(queryStr)
      result = engine.execute(queryStr)
      ret = result.fetchall()
      jsonData = []

        #循环读取元组数据
        #将元组数据转换为列表类型，每个条数据元素为字典类型:[{'字段1':'字段1的值','字段2':'字段2的值',...,'字段N:字段N的值'},{第二条数据},...,{第N条数据}]
      for row in ret:
          result = {}
          result['id'] = row[0]
          result['creatorID'] = row[1]
          result['conferenceName'] = row[2]
          result['shortname'] = row[3]
          result['startTime'] = str(row[4])
          result['endTime'] = str(row[5])
          result['location'] = row[6]
          result['ownerOrganization'] = row[7]
          result['supporter'] = row[8]
          result['organizer'] = str(row[9])
          result['site'] = row[10]
          result['abstract'] = row[11]
          result['ownerPeopleName'] = row[12]
          result['ownerPeopleTel'] = row[13]
          result['ownerPeopleEmail'] = row[14]
          result['contributionStartTime'] = str(row[15])
          result['contributionEndTime'] = str(row[16])
          result['contributionTheme'] = str(row[17])
          result['contributionAbstract'] = row[18]
          result['authorName'] = row[19]
          result['authorPrice'] = row[20]
          result['authorNumber'] = row[21]
          result['authorAbstract'] = row[22]
          result['generalName'] = row[23]
          result['generalPrice'] = row[24]
          result['generalNumber'] = row[25]
          result['generalAbstract'] = row[26]
          jsonData.append(result)
          print(jsonData)
      return jsonData
@holy.route('/returnConference/<id>',methods=['GET'])
def returnCon(id):
      if request.method == 'GET':
            try:
                  res=getALLfromDB(id,'conference')
                  jsondatar=json.dumps(res,ensure_ascii=False)
                  print(jsondatar)
                #   engine.execute(
                # "INSERT INTO user(name,organization,email,password,identity,realName,filePath) \
                # VALUES (%(name)s,%(realName)s,%(organization)s,%(email)s,%(password)s, %(identity)s,%(filePath)s,)",
                # name=data['name'],realName=data['realName'],
                # organization=data['organization'],email=data['email'],
                # password=data['password'],identity=data['identity'],
                # filePath=data['filePath']
                # )
            except:
                return jsonify({"result":0})
            else:
                  #return jsonify({"result":1})
                return jsondatar



@holy.route('/returnUser/<id>',methods=['GET'])
def returnUser(id):
      if request.method == 'GET':
            try:
                  res=getALLfromUser(id,'user')
                  jsondatar=json.dumps(res,ensure_ascii=False)
                  print(jsondatar)
                #   engine.execute(
                # "INSERT INTO user(name,organization,email,password,identity,realName,filePath) \
                # VALUES (%(name)s,%(realName)s,%(organization)s,%(email)s,%(password)s, %(identity)s,%(filePath)s,)",
                # name=data['name'],realName=data['realName'],
                # organization=data['organization'],email=data['email'],
                # password=data['password'],identity=data['identity'],
                # filePath=data['filePath']
                # )
            except:
                return jsonify({"result":0})
            else:
                  #return jsonify({"result":1})
                return jsondatar

@holy.route('/userConference/<id>',methods=['GET'])
def returnConferenceByUserID(id):
      if request.method == 'GET':
            try:
                  res=getALLConferenceByCreatorID(id,'conference')
                  jsondatar=json.dumps(res,ensure_ascii=False)
                  print(jsondatar)
                #   engine.execute(
                # "INSERT INTO user(name,organization,email,password,identity,realName,filePath) \
                # VALUES (%(name)s,%(realName)s,%(organization)s,%(email)s,%(password)s, %(identity)s,%(filePath)s,)",
                # name=data['name'],realName=data['realName'],
                # organization=data['organization'],email=data['email'],
                # password=data['password'],identity=data['identity'],
                # filePath=data['filePath']
                # )
            except:
                return jsonify({"result":0})
            else:
                  #return jsonify({"result":1})
                return jsondatar
@holy.route('/userCollection/<id>',methods=['GET'])
def returnCollectionByUserID(id):
      if request.method == 'GET':
            try:
                  res=getCollectionByID(id,'conference','userCollection')
                  print(1)
                  print(res)

                  jsondatar=json.dumps(res,ensure_ascii=False)
                  print(jsondatar)
                #   engine.execute(
                # "INSERT INTO user(name,organization,email,password,identity,realName,filePath) \
                # VALUES (%(name)s,%(realName)s,%(organization)s,%(email)s,%(password)s, %(identity)s,%(filePath)s,)",
                # name=data['name'],realName=data['realName'],
                # organization=data['organization'],email=data['email'],
                # password=data['password'],identity=data['identity'],
                # filePath=data['filePath']
                # )
            except:
                return jsonify({"result":0})
            else:
                  #return jsonify({"result":1})
                return jsondatar

@holy.route('/userInfo/<name>',methods=['GET'])
def returnUserByUserName(name):
      if request.method == 'GET':
            try:
                  res=getALLfromUsername(name,'user')
                  print(1)
                  print(res)

                  jsondatar=json.dumps(res,ensure_ascii=False)
                  print(jsondatar)
                #   engine.execute(
                # "INSERT INTO user(name,organization,email,password,identity,realName,filePath) \
                # VALUES (%(name)s,%(realName)s,%(organization)s,%(email)s,%(password)s, %(identity)s,%(filePath)s,)",
                # name=data['name'],realName=data['realName'],
                # organization=data['organization'],email=data['email'],
                # password=data['password'],identity=data['identity'],
                # filePath=data['filePath']
                # )
            except:
                return jsonify({"result":0})
            else:
                  #return jsonify({"result":1})
                return jsondatar
