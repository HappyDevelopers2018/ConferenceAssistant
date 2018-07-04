from sqlalchemy import create_engine
from flask  import Flask,request,session,g,redirect,url_for,Blueprint,jsonify
import json
# pymysql://root:123456@192.168.168.231:3306/test
# 连接数据库的模块：//用户名:密码@ip:端口/数据库
engine = create_engine("mysql+pymysql://root:123@localhost:3306/happy?charset=utf8")

primary_info_update = Blueprint('primary_info_update', __name__)

# preprocession begin
def getSearchResult(str,db):
    queryStr='select * from '+ db+' where conferenceName= '
    queryStr+=str
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
@primary_info_update.route('/hellozjc',methods=['GET'])
def hellozjc():
    return 'hello';

@primary_info_update.route('/primary_info_email_upd_API',methods=['POST'])
def email_upd():
    print("===========================================zjc===")
    if request.method == 'POST':
        data = getParam(request.get_data().decode('UTF-8'));
        print("===========================================")
        print(data)
        id = data['id']
        email = data['email']
        print(id)
        print(email)
        try:
            sql_instruction = 'update user set email ='+email+'where id ='+id;
            print(sql_instruction);
            engine.execute(sql_instruction)
            print("===========================================")
        except:
            return 0;
        else:
            return 1;
        finally:
            pass;


@primary_info_update.route('/primary_info_organization_upd_API',methods=['POST'])
def email_upd():
    if request.method == 'POST':
        data = getParam(request.get_data().decode('UTF-8'));
        print(data)
        id = data['id']
        organization = data['organization']
        print(id)
        print(organization)
        try:
            engine.execute('update user set organization ='+organization+'where id ='+id)
        except:
            return 0;
        else:
            return 1;
        finally:
            pass;

