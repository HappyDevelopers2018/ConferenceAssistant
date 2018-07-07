from sqlalchemy import create_engine
from flask  import Flask,request,session,g,redirect,url_for,Blueprint,jsonify
import json
# pymysql://root:123456@192.168.168.231:3306/test
# 连接数据库的模块：//用户名:密码@ip:端口/数据库
engine = create_engine("mysql+pymysql://root:123@localhost:3306/happy?charset=utf8")

cl_test = Blueprint('cl_test', __name__)

# preprocession begin
def getSearchResult(str,db):
    queryStr = 'select * from '+ db+' where conferenceName= '
    queryStr += str
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

# preprocession end

@cl_test.route('/test_primary_info_email_upd_API/<id>/<email>',methods=['GET'])
def test_upd_email(id,email):
      if request.method == 'GET':
            print("=============================================================================cl test  ===========================================================================================================")
            # email='123'
            try:
                  sql_instruction = 'update user set email = "' + email + '"  where id = '+ id
                  engine.execute(sql_instruction)
            except:
                return jsonify({"result":0})
            else:
                return jsonify({"result":1})
                 


# @primary_info_update.route('/hellozjc',methods=['GET'])
# def hellozjc():
#     return 'hello'

# @primary_info_update.route('/primary_info_email_upd_API',methods=['POST'])
# def email_upd():
#     if request.method == 'POST':
#         data = getParam(request.get_data().decode('UTF-8'))
#         id = data['id']
#         email = data['email']
#         email = email.decode('UTF-8')
#         try:
#             sql_instruction = 'update user set email = "'+email+'" where id = '+id
#             engine.execute(sql_instruction)
#         except:
#             return 0
#         else:
#             return 1
#         finally:
#             pass


# @primary_info_update.route('/primary_info_organization_upd_API',methods=['POST'])
# def organization_upd():
#     if request.method == 'POST':
#         data = getParam(request.get_data().decode('UTF-8'))
#         print(data)
#         id = data['id']
#         organization = data['organization']
#         print(id)
#         print(organization)
#         organization = organization.decode('UTF-8')
#         print(id)
#         print(organization)
#         try:
#             sql_instruction='update user set organization = "'+organization+'" where id = '+id
#             print(sql_instruction)
#             engine.execute(sql_instruction)
#             print(sql_instruction)
#         except:
#             print("==1==")
#             return "0"
#         else:
#             print("==2==")
#             return "1"
#         finally:
#             print("==3==")
#             pass

# @primary_info_update.route('/primary_info_name_upd_API',methods=['POST'])
# def name_upd():
#     if request.method == 'POST':
#         data = getParam(request.get_data().decode('UTF-8'))
#         print(data)
#         id = data['id']
#         name = data['realName']
#         print(id)
#         print(name)
#         name = name.decode('UTF-8')
#         print(id)
#         print(name)
#         try:
#             sql_instruction='update user set realName = "'+ name +'" where id = '+id
#             print(sql_instruction)
#             engine.execute(sql_instruction)
#             print(sql_instruction)
#         except:
#             print("==1==")
#             return "0"
#         else:
#             print("==2==")
#             return "1"
#         finally:
#             print("==3==")

#             pass

