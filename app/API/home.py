from sqlalchemy import create_engine
from flask  import Flask,request,session,g,redirect,url_for,Blueprint,jsonify
import json
import traceback
# pymysql://root:123456@192.168.168.231:3306/test
# 连接数据库的模块：//用户名:密码@ip:端口/数据库
engine = create_engine("mysql+pymysql://root:123@localhost:3306/happy?charset=utf8")

home = Blueprint('home', __name__)


def getALLfromDB(db):
      queryStr='select * from '+db+' order by startTime desc'

      print(queryStr)
      result = engine.execute(queryStr)

      ret = result.fetchall()
      #print(ret)
      jsonData = []

        #循环读取元组数据
        #将元组数据转换为列表类型，每个条数据元素为字典类型:[{'字段1':'字段1的值','字段2':'字段2的值',...,'字段N:字段N的值'},{第二条数据},...,{第N条数据}]
      for row in ret[:5]:
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
@home.route('/getNewConference',methods=['GET'])
def returnNewC():
     if request.method == 'GET':
         try:
             #print('hello')
             res = getALLfromDB('conference')
             #print(res)
             jsondatar = json.dumps(res, ensure_ascii=False)
             #print(jsondatar)
         except:
             traceback.print_exc()
             return jsonify({"result": 0})
         else:
             return jsondatar
def getNums():
     queryStr = "select count(*) from conference"
     print(queryStr)
     result = engine.execute(queryStr)
     rett = result.fetchall()
     print(rett[0][0])
     num = rett[0][0]
     return num
@home.route("/getConfernum",methods=['GET'])
def returnNum():
     if request.method == 'GET':
         try:
             ress = getNums()
             ans = jsonify(num=ress)
         except:
             traceback.print_exc()
             return jsonify({"result":0})
         else:
             return ans




