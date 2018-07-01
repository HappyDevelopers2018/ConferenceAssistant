from sqlalchemy import create_engine
from flask  import Flask,request,session,g,redirect,url_for,Blueprint,jsonify

# pymysql://root:123456@192.168.168.231:3306/test 
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
@zc.route('/login',methods=['POST'])
def login():
      if request.method == 'POST':
            data = getParam((request.get_data()).decode())
            print(data)
            result = engine.execute('select id from user where name='+data['name']+' and password='+data['password'])
            ret = result.fetchall()
            return jsonify({"result":len(ret)})


@zc.route('/register',methods=['POST'])
def register():
      if request.method == 'POST':
            data = getParam((request.get_data()).decode())
            print(data)
            try:
                  engine.execute(insertDB(data,'user'))
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
                #   engine.execute(
                # "INSERT INTO conference(creatorID,conferenceName,shortname,startTime,endTime,\
                # city,location,ownerOrganization,supporter,organizer,site,abstract,\
                # ownerPeopleName,ownerPeopleTel,ownerPeopleEmail,\
                # contributionStartTime,contributionEndTime,contributionTheme,contributionAbstract,\
                # authorName,authorPrice,authorNumber,authorAbstract,\
                # generalName,generalPrice,generalNumber,generalAbstract,\
                # ) VALUES \
                # (%(creatorID)s,%(conferenceName)s, %(shortname)s,%(startTime)s, %(endTime)s,\
                # %(city)s,%(location)s,%(ownerOrganization)s, %(supporter)s,%(organizer)s,%(site)s, %(abstract)s,\
                # %(ownerPeopleName)s,%(ownerPeopleTel)s, %(ownerPeopleEmail)s,\
                # %(contributionStartTime)s, %(contributionEndTime)s,%(contributionTheme)s,%(contributionAbstract)s, \
                # %(authorName)s,%(authorPrice)s, %(authorNumber)s,%(authorAbstract)s,\
                # %(generalName)s, %(generalPrice)s,%(generalNumber)s, %(generalAbstract)s)",
                # creatorID=data['creatorID'],conferenceName=data['conferenceName'],
                # shortname=data['shortname'],startTime=data['startTime'],endTime=data['endTime'],
                # city=data['city'],location=data['location'],ownerOrganization=data['ownerOrganization'],
                # supporter=data['supporter'],organizer=data['organizer'],site=data['site'],abstract=data['abstract'],
                # ownerPeopleName=data['ownerPeopleName'],ownerPeopleTel=data['ownerPeopleTel'],ownerPeopleEmail=data['ownerPeopleEmail'],
                # contributionStartTime=data['contributionStartTime'],contributionEndTime=data['contributionEndTime'],
                # contributionTheme=data['contributionTheme'],contributionAbstract=data['contributionAbstract'],
                # authorName=data['authorName'],authorPrice=data['authorPrice'],
                # authorNumber=data['authorNumber'],authorAbstract=data['authorAbstract'],
                # generalName=data['generalName'],generalPrice=data['generalPrice'],
                # generalNumber=data['generalNumber'],generalAbstract=data['generalAbstract']
                # )
            except:
                  return jsonify({"result":0})
            else:
                  return jsonify({"result":1})
            finally:
                  pass
# var data={'name':'1', 'realName':'11','organization':'1', 'email':'11','password':'1','identity':1,'filePath':'1'}
# $.ajax({
#       type: "POST",
#       url: "/register",
#       data: data,
#       dataType: "json",
#       contentType: 'application/json; charset=UTF-8',
#       success: function(data){
#                          console.log(data)
#                      }
#                  });



