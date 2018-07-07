#!/usr/bin/env python
# -*- coding: utf-8 -*-
from sqlalchemy import create_engine
from flask import Flask,request,session,g,redirect,url_for,Blueprint,jsonify
import json
# pymysql://root:123456@192.168.168.231:3306/test
# 连接数据库的模块：//用户名:密码@ip:端口/数据库

engine = create_engine("mysql+pymysql://root:123@localhost:3306/happy?charset=utf8")

collection = Blueprint('collection', __name__)

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

def getInsertQuery(table, value):
    '''
    this is a interface to get the insert query.

    parameter:
        table: the target table which we want to insert. eg. "user"
        value: the column and value. eg. {"user_id": 1, "user_name": "lvyuanhao"}

    return:
        the query. eg. "insert into user(user_id, user_name) values(1, "lvyuanhao")"
    '''
    query = "insert into " + table + "("
    key = list(value.keys())
    num = len(key)
    for i in range(num - 1):
        query += key[i] + ","
    query += key[-1] + ") values("
    for i in range(num - 1):
        if isinstance(value[key[i]], int):
            query += str(value[key[i]]) + ', '
        elif isinstance(value[key[i]], str):
            query += '"' + str(value[key[i]]) +'"' + ', '
    if isinstance(value[key[-1]], int):
        query += str(value[key[-1]]) + ')'
    elif isinstance(value[key[-1]], str):
        query += '"' + str(value[key[-1]]) + '"' + ')'
    return query

def getDeleteQuery(table, condition):
    '''
    this is a interface to get the delete query.

    parameter:
        table: the target table which we want to insert. eg. "user"
        condition: the column and condition. eg. {"user_id": 1, "user_name": "lvyuanhao"}

    return:
        the query. eg. "delete from user where user_id=1 and user_name="lvyuanhao""
    '''
    query = "delete from " + table + " where "
    key = list(condition.keys())
    num = len(key)
    for i in range(num - 1):
        query += key[i] + "="
        if isinstance(condition[key[i]], int):
            query += str(condition[key[i]]) + ' and '
        elif isinstance(condition[key[i]], str):
            query += '"' + str(condition[key[i]]) + '"' + ' and '
    query += key[-1] + "="
    if isinstance(condition[key[-1]], int):
        query += str(condition[key[-1]])
    elif isinstance(condition[key[-1]], str):
        query += '"' + str(condition[key[-1]]) + '"'
    return query

def insertIntoDB(table, value):
    '''
    this is a interface to insert into the database.

    parameter:
        table: the target table which we want to insert. eg. "user"
        value: the column and value. eg. {"user_id": 1, "user_name": "lvyuanhao"}

    return:
        1: success
        0: fail
    '''
    query = getInsertQuery(table=table, value=value)
    try:
        result = engine.execute(query)
    except:
        return 0
    return 1


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

def deleteFromDB(table, condition):
    '''
    this is a interface to delete from the database.

    parameter:
        table: the target table which we want to insert. eg. "user"
        condition: the column and condition. eg. {"user_id": 1, "user_name": "lvyuanhao"}

    return:
        1: success
        0: fail
    '''
    query = getDeleteQuery(table=table, condition=condition)
    try:
        result = engine.execute(query)
    except:
        return 0
    return 1

def insertTime(conference_id, user_id):
    """
    This function is useless just to satisfy the scrum master's requirements.

    parameter:
        conference_id: if you do not know what it means, you should go back to middle school.
        user_id: the same
    return:
        1: success
        0: fail
    """
    listOfTime = ["startTime", "endTime", "contributionStartTime", "contributionEndTime",
                  "registerStartTime", "registerEndTime"]
    resultOfConference = selectFromDB(listOfTime, {"id": conference_id}, "conference")
    conferenceName = selectFromDB(["conferenceName"], {"id": conference_id}, "conference")
    for i in range(6):
        insertIntoDB("message",
                     {"userID": user_id, "conferenceID": conference_id, "content": conferenceName[0]["conferenceName"],
                      "time": resultOfConference[0][listOfTime[i]], "isRead": 0, "type": i})

def deleteTime(conference_id, user_id):
    deleteFromDB("message", {"conferenceID": conference_id, "userID": user_id})

@collection.route('/judgeCollection/<user_id>/<conference_id>', methods=['GET', 'POST'])
def judgeIfUserHasCollectedThisConference(user_id, conference_id):
    '''
    this function is to judge if user has collected this conference

    pamameter:
        user_id: represent the user who want to collect the conference
        conference_id: represent the conference which user want to collect

    return:
        1: collect
        0: not collect
    '''
    user_id = int(user_id)
    result = selectFromDB(["collection"], {"id": user_id}, "user")
    if result is None:
        return "0"
    collection = result[0]["collection"]
    if collection is None:
        return "0"
    collectList = collection.split("-")
    if (str(conference_id) in collectList):
        return "1"
    else:
        return "0"

@collection.route('/removeCollection/<user_id>/<conference_id>', methods=['GET', 'POST'])
def removeCollection(user_id, conference_id):
    '''
    this function is to remove the collected conference

    pamameter:
        user_id: represent the user who want to remove the conference
        conference_id: represent the conference which user want to remove

    return:
        1: success
        0: fail
    '''
    user_id = int(user_id)
    result = selectFromDB(["collection"], {"id": user_id}, "user")
    if result is None:
        return "0"
    collection = result[0]["collection"]
    collectList = collection.split("-")
    while (str(conference_id) in collectList):
        collectList.remove(str(conference_id))
    num_collection = len(collectList)
    collection = ""
    if num_collection != 0:
        collection += collectList[0]
    for i in range(1, num_collection):
        collection += "-" + collectList[i]
    query = 'update user set collection=' + '"' + collection + '"' + " where id=" + str(user_id)
    try:
        engine.execute(query)
        deleteTime(conference_id=int(conference_id), user_id=user_id)
    except:
        return "0"
    return "1"


@collection.route('/addCollection/<user_id>/<conference_id>', methods=['GET', 'POST'])
def addCollection(user_id, conference_id):
    '''
    this function is to add Conference to the user's collection list, which can enable the users
    to retrieve the conference more conveniently.

    pamameter:
        user_id: represent the user who want to collect the conference
        conference_id: represent the conference which user want to collect

    return:
        1: add successfully
        0: failed
    '''
    user_id = int(user_id)
    result = selectFromDB(["collection"], {"id": user_id}, "user")
    tmp = result[0]["collection"]
    if tmp is None or tmp == "":
        tmp = conference_id
    else:
        tmp += "-" + str(conference_id)
    query = 'update user set collection=' + '"' + tmp + '"' + " where id=" + str(user_id)
    try:
        engine.execute(query)
        insertTime(int(conference_id), user_id)
    except:
        return "0"
    return "1"

@collection.route('/getCollection/<user_id>', methods=['GET', 'POST'])
def getCollection(user_id):
    '''
    this function is to get the user's collection list.

    pamameter:
        user_id: represent the user

    return:
        a list of the collectionID in the format of string. eg. ['1','12','13']
    '''
    user_id = int(user_id)
    result = selectFromDB(["collection"], {"id": user_id}, "user")
    if result is None:
        return "0"
    collection = result[0]["collection"]
    if collection is None:
        return "0"
    collectList = collection.split("-")
    ret = []
    for conference_id in collectList:
        print(conference_id)
        tmp=selectFromDB(['id', 'conferenceName', 'startTime', 'endTime', 'abstract'], {"id": conference_id},"conference")
        tmp[0]['abstract']
        filepath1 = '/home/happy/abstractTxt/' + tmp[0]['abstract']
        print(filepath1)
        f1 = open(filepath1, 'r')
        tmp[0]['abstract'] = (f1.read())
        f1.close()
        ret.append(tmp[0])
    return json.dumps(ret, ensure_ascii=False)







