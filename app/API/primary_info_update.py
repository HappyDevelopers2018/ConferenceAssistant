from sqlalchemy import create_engine
from flask  import Flask,request,session,g,redirect,url_for,Blueprint,jsonify
import json
import os
from werkzeug.utils import secure_filename
import urllib.parse
import traceback
# pymysql://root:123456@192.168.168.231:3306/test
# 连接数据库的模块：//用户名:密码@ip:端口/数据库
engine = create_engine("mysql+pymysql://root:123@localhost:3306/happy?charset=utf8")

primary_info_update = Blueprint('primary_info_update', __name__)

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

def chinese_builder(str):
    ret = urllib.parse.unquote(str)
    return ret
# preprocession end
@primary_info_update.route('/hellozjc',methods=['GET'])
def hellozjc():
    return 'hello'

@primary_info_update.route('/primary_info_email_upd_API',methods=['POST'])
def email_upd():
    print("===========================================zjc===")
    if request.method == 'POST':
        data = getParam(request.get_data().decode('UTF-8'))
        print("===========================================")
        print(data)
        id = data['id']
        email = data['email']
        print(id)
        print(email)
        #email = email.decode('UTF-8')
        email = chinese_builder(email)
        print(id)
        print(email)
        try:
            sql_instruction = 'update user set email = "'+email+'" where id = '+id
            print(sql_instruction)
            engine.execute(sql_instruction)

            print("===========================================")
        except:
            print("=1=")
            return "0"
        else:
            print("=2=")
            return "1"
        finally:
            print("=3=")
            pass


@primary_info_update.route('/primary_info_organization_upd_API',methods=['POST'])
def organization_upd():
    if request.method == 'POST':
        data = getParam(request.get_data().decode('UTF-8'))
        print(data)
        id = data['id']
        organization = data['organization']
        print(id)
        print(organization)
        organization = chinese_builder(organization)
        #organization = organization.decode('UTF-8')
        print(id)
        print(organization)
        try:
            sql_instruction='update user set organization = "'+organization+'" where id = '+id
            print(sql_instruction)
            engine.execute(sql_instruction)
            print(sql_instruction)
        except:
            print("==1==")
            return "0"
        else:
            print("==2==")
            return "1"
        finally:
            print("==3==")
            pass

@primary_info_update.route('/primary_info_name_upd_API',methods=['POST'])
def name_upd():
    if request.method == 'POST':
        data = getParam(request.get_data().decode('UTF-8'))
        print(data)
        id = data['id']
        name = data['realName']
        print(id)
        print(name)
        #name = name.decode('UTF-8')
        name = chinese_builder(name)
        print(id)
        print(name)
        try:
            sql_instruction='update user set realName = "'+ name +'" where id = '+id
            print(sql_instruction)
            engine.execute(sql_instruction)
            print(sql_instruction)
        except:
            print("==1==")
            return "0"
        else:
            print("==2==")
            return "1"
        finally:
            print("==3==")
            pass

@primary_info_update.route('/conf_info_upd_API',methods=['POST'])
def conf_conference_info_upd():
    print("====== this is conf info upd func ======")
    if request.method == 'POST':
        data = getParam(request.get_data().decode('UTF-8'))
        id = data['id']
        file = str(id)+'_abstract.txt'
        print(file)
        filepath='/home/happy/abstractTxt/'
        with open(filepath+file,'w') as f:
            content = chinese_builder(data['abstract'])
            f.write(chinese_builder(content))
            print("write to "+file)
        data['abstract']=file

        file = str(id)+'_contributionAbstract.txt'
        with open(filepath+file,'w') as f:
            content = chinese_builder(data['contributionAbstract'])
            f.write(chinese_builder(content))
            print("write to "+file)
        data['contributionAbstract']=file

        # file = str(id)+'_schedule.txt'
        # with open(filepath+file,'w') as f:
        #     content = chinese_builder(data['schedule'])
        #     f.write(chinese_builder(content))
        #     print("write to "+file)
        # data['schedule']=file

        # file = str(id)+'_hotelAndTraffic.txt'
        # with open(filepath+file,'w') as f:
        #     content = chinese_builder(data['hotelAndTraffic'])
        #     f.write(chinese_builder(content))
        #     print("write to "+file)
        # data['hotelAndTraffic']=file
        #name = name.decode('UTF-8')
        
        try:
            sql_instruction='update conference set '
            print(1)
            
            n = len(data)
            print(2)
            i = 0
            print(3)
            print(n)
            print(4)
            for item in data:
                print(5)
                i += 1
                if (item != 'id'):
                    print(6)
                    print(sql_instruction)

                    sql_instruction = sql_instruction + item + ' = '
                    print(sql_instruction)
                    sql_instruction += '"' + chinese_builder(data[item]) + '"'
                    print(sql_instruction)
                    sql_instruction += ', '[i==n]
                    print(sql_instruction)
                    print(7)
                print(">> i is :" + str(i))
                print(">> n is :" + str(n))
            print(8)
            print(type(id))
            sql_instruction  += ' where id = ' + id
            print(sql_instruction)
            engine.execute(sql_instruction)
            print(sql_instruction)
        except:
            print("error happen")
            return jsonify({"result":0})
        else:
            return jsonify({"result":id})

