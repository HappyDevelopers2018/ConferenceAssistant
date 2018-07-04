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

def selectFromDB(select, where, table):
    '''
    this is a interface to select from the database.

    parameter:
        select: a list of the columns which we want to select from the database. eg. ["user_id", "user_name"]
        where: a list of the requirements which the result of the select should satisfy. eg. {"user_id": 1}
        table: the target table which we want to select

    return:
        list of the result, the result is stored in a dict. eg.[{user_id: 1, user_name: "sam"}],...]
    '''
    query = getSelectQuery(select, where, table)
    result = engine.execute(query)
    ret = result.fetchall()
    result = []
    num_result = len(ret)
    num_column = len(ret[0])
    for j in range(num_result):
        tmp = {}
        for i in range(num_column):
            tmp[select[i]] = ret[j][i]
        result.append(tmp)
    return result

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
    collection = result[0]["collection"]
    collectList = collection.split("-")
    if (str(conference_id) in collectList):
        return 1
    else:
        return 0

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
    if tmp is None:
        tmp = conference_id
    else:
        tmp += "-" + str(conference_id)
    query = 'update user set collection=' + '"' + tmp + '"' + " where id=" + str(user_id)
    try:
        engine.execute(query)
    except:
        return "0"
    return "1"







