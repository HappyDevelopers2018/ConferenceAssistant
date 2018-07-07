#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2018/7/6 9:27
# @Author  : ereret2
# @Site    : 
# @File    : paper.py
# @Software: PyCharm

from sqlalchemy import create_engine
from flask import Flask,request,session,g,redirect,url_for,Blueprint,jsonify,send_from_directory,make_response,send_file
import json
import urllib.parse
import os
import zipfile
from io import BytesIO

engine = create_engine("mysql+pymysql://root:123@localhost:3306/happy?charset=utf8")

paper = Blueprint('paper', __name__)
def getSelectQuery(select, where, table):
    '''
    this is a interface to get the query.

    parameter:
        select: a list of the columns which we want to select from the database. eg. ["user_id", "user_name"]
        where: a list of the requirements which the result of the select should satisfy. eg. {"user_id": 1}
        table: the target table which we want to select. eg. "user"

    return:
        the query. eg. "select user_id, user_name from user where user_id=1"
    '''
    num_select = len(select)
    # notice the space in the query
    query = 'select '
    for i in range(num_select - 1):
        query += select[i] + ", "
    query += select[-1]
    query += ' from ' + table + ' where '
    key = list(where.keys())
    num_where = len(where.keys())
    for i in range(num_where - 1):
        if isinstance(where[key[i]], int):
            query += key[i] + '=' + str(where[key[i]]) + ' and '
        elif isinstance(where[key[i]], str):
            query += key[i] + '=' + '"' + str(where[key[i]]) +'"' + ' and '
    if isinstance(where[key[num_where - 1]], int):
        query += key[num_where - 1] + '=' + str(where[key[num_where - 1]])
    elif isinstance(where[key[num_where - 1]], str):
        query += key[num_where - 1] + '=' + '"' + str(where[key[num_where - 1]]) + '"'
    return query + ';'

def selectFromDB(select, where, table):
    '''
    this is a interface to select from the database.

    parameter:
        select: a list of the columns which we want to select from the database. eg. ["user_id", "user_name"]
        where: a list of the requirements which the result of the select should satisfy. eg. {"user_id": 1}
        table: the target table which we want to select

    return:
        list of the result, the result is stored in a dict. eg.[{user_id: 1, user_name: "sam"}],...]
        or None if there are no result which meet the requirements
    '''
    query = getSelectQuery(select, where, table)
    result = engine.execute(query)
    ret = result.fetchall()
    if len(ret) == 0:
        return None
    result = []
    num_result = len(ret)
    num_column = len(ret[0])
    for j in range(num_result):
        tmp = {}
        for i in range(num_column):
            tmp[select[i]] = ret[j][i]
        result.append(tmp)
    return result

def getFileNameAndPath(allfilePath):
    '''
    This function is to split the real path into path name and file path.
    param:
        filePath: file path in the format of string. eg."/home/happy/contribution/1_我的会议-查看相关的会议.png"

    return:
        file name and file path.
        eg. ['/home/happy/contribution/', '1_我的会议-查看相关的会议.png']
    '''
    result = []
    allfilePath = allfilePath.split('/')
    num = len(allfilePath)
    fileName = allfilePath[-1]
    filePath = ''
    for i in range(num - 1):
        filePath += allfilePath[i] + '/'
    result.append(filePath)
    result.append(fileName)
    return result

def zip_files(files, zip_name):
    zip = zipfile.ZipFile(zip_name, 'w', zipfile.ZIP_DEFLATED)
    for file in files:
        #print('compressing', file)
        zip.write(file)
    zip.close()

    # print('compressing finished')

@paper.route('/paperAudit/<paper_id>/<state>', methods=['GET', 'POST'])
def paperAudit(paper_id, state):
    """
    This function is to commit the audit result of the paper.

    parameter:
        paper_id: the paper which is to be changed.
        state: the target state which should be.
    return:
        1: success
        0: fail
    """
    if request.method == 'POST':
        data = request.get_data().decode('UTF-8')
        print(data)
        query = 'update contribution set checkStatus=' + str(state) + \
                ' where id=' + str(paper_id)
        query1 = 'update contribution set modificationAdvise=' + '"' + data + '"' + \
                ' where id=' + str(paper_id)
        try:
            engine.execute(query)
            engine.execute(query1)
        except:
            return "0"
        return "1"
    return "2"

@paper.route('/paperDownload/<paper_id>', methods=['GET', 'POST'])
def paperDownload(paper_id):
    """
    This function is let the audit people to download the paper.

    parameter:
        paper_id: the paper which is to be downloaded.
    return:
        paper file if success or '0' if fail.
    """
    try:
        result = selectFromDB(["filePath"], {"id": paper_id}, "contribution")
    except:
        return '0'
    if result is None:
        return "0"
    filePath = result[0]["filePath"]
    if os.path.isfile(filePath):
        file = getFileNameAndPath(filePath)
        response = make_response(send_from_directory(file[0], file[1], as_attachment=True))
        response.headers["Content-Disposition"] = "attachment; filename={}".format(file[1].encode().decode('latin-1'))
        return response

@paper.route('/multiplePaperDownload/<conference_id>', methods=['GET', 'POST'])
def multiplePaperDownload(conference_id):
    """
    This function enable the users to download all the papers of a conference.
    param:
        conference_id: the conference id whose all papers will be downloaded.
    return:
        a zip file which contains all the papers in a conference.
    """
    try:
        result = selectFromDB(["filePath"], {"conferenceID": int(conference_id)}, "contribution")
    except:
        return '0'
    if result is None:
        return "0"
    files = []
    num = len(result)
    for i in range(num):
        files.append(getFileNameAndPath(result[i]['filePath']))
    # return json.dumps(files, ensure_ascii=False)
    os.system("rm -rf /home/happy/contribution/all.tar")
    for i in range(num):
        os.system(command="tar -rf /home/happy/contribution/all.tar -C /home/happy/contribution/ " + files[i][1])

    return(send_from_directory('/home/happy/contribution/', 'all.tar', as_attachment=True))

@paper.route('/paperNum/<conference_id>', methods=['GET', 'POST'])
def paperNum(conference_id):
    """
    This function enable the users to know the paper number of a conference.

    param:
        conference_id: the conference id whose all papers will be downloaded.
    return:
        a number in the format of string. eg. "12"
        or 'error' if fail
    """
    try:
        result = selectFromDB(["id"], {"conferenceID": conference_id}, "contribution")
    except:
        return "error"
    if result is None:
        return "0"
    num = len(result)
    return str(num)

@paper.route('/paperStatic/<conference_id>', methods=['GET', 'POST'])
def paperStatic(conference_id):
    """
    This function enable the users to know the static of a conference like how many papers are allowed to join the conference.

    param:
        conference_id: the conference id whose all papers will be downloaded.
    return:
        a list of results like [12,12,12,12]
        the first the num of the papers
        the second is the num of the papers which is denied
        the third is the num of the papers which is allowed to join the conference
        the fourth is the num of the papers which should be changed to join the conference
        the fifth is the num of the papers which should be checked
    """
    static = []
    try:
        resultofAll = selectFromDB(["id"], {"conferenceID": conference_id}, "contribution")
        resultofdeny = selectFromDB(["id"], {"conferenceID": conference_id, "checkStatus": 0}, "contribution")
        resultofJoin = selectFromDB(["id"], {"conferenceID": conference_id, "checkStatus": 1}, "contribution")
        resultoChange = selectFromDB(["id"], {"conferenceID": conference_id, "checkStatus": 2}, "contribution")
        resultoNeed = selectFromDB(["id"], {"conferenceID": conference_id, "checkStatus": 3}, "contribution")
    except:
        return "error"
    if resultofAll is None:
        static.append(0)
    else:
        num = len(resultofAll)
        static.append(num)
    if resultofdeny is None:
        static.append(0)
    else:
        num = len(resultofdeny)
        static.append(num)
    if resultofJoin is None:
        static.append(0)
    else:
        num = len(resultofJoin)
        static.append(num)
    if resultoChange is None:
        static.append(0)
    else:
        num = len(resultoChange)
        static.append(num)
    if resultoNeed is None:
        static.append(0)
    else:
        num = len(resultoNeed)
        static.append(num)
    return json.dumps(static, ensure_ascii=False)








