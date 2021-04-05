import json
import jieba
from flask import render_template, request
from app import app
from app.Dao.DBquery import DBquery
import requests
import json

from java import *


@app.route('/getwlyq', methods=["GET", "POST"])
def getWlyq():
    page = int(request.args['page'])
    limit = int(request.args['limit'])
    result = dict()
    result['code'] = 0
    result['msg'] = ''
    db = DBquery()
    sql = "select * from yx_yqxx "
    sjList = db.query(sql)
    result['count'] = len(sjList)
    l1 = list()
    for i in range(len(sjList)):
        data = dict()
        data['xh'] = i + 1
        data['yqbh'] = sjList[i][0]
        data['yqbt'] = sjList[i][1][0:35] + ".." if len(sjList[i][1]) > 20 else sjList[i][1]
        data['yqnr'] = sjList[i][2]
        data['yqly'] = sjList[i][3]
        data['hbsj'] = sjList[i][4]
        data['yqrm'] = sjList[i][5][0:10] + ".." if len(sjList[i][5]) > 10 else sjList[i][5]
        data['yqdm'] = sjList[i][6]
        l1.append(data)
    result['data'] = l1[(page - 1) * 10:page * 10]
    del db
    return result


@app.route('/getrdsj', methods=["GET", "POST"])
def getRdsj():
    result = dict()
    result['code'] = 0
    result['msg'] = 'success'
    db = DBquery()
    sql = "select * from yx_sjxx "
    sjList = db.query(sql)
    result['count'] = len(sjList)
    l1 = list()
    for i in range(len(sjList)):
        data = dict()
        data['xh'] = i + 1
        data['sjbh'] = sjList[i][0]
        data['sjmc'] = sjList[i][1]
        data['gjdy'] = sjList[i][2]
        data['cjsj'] = sjList[i][3]
        data['gxsj'] = sjList[i][4]
        l1.append(data)
    result['data'] = l1
    del db
    return result


@app.route('/getsjdy', methods=["GET", "POST"])
def getSjdy():
    result = dict()
    result['code'] = 0
    result['msg'] = 'success'
    db = DBquery()
    sql = "select * from yx_sjxx "
    sjList = db.query(sql)
    result['count'] = len(sjList)
    l1 = list()
    for i in range(len(sjList)):
        data = dict()
        data['xh'] = i + 1
        data['sjbh'] = sjList[i][0]
        data['sjmc'] = sjList[i][1]
        data['gjdy'] = sjList[i][2]
        data['gxsj'] = sjList[i][4]
        l1.append(data)
    result['data'] = l1
    del db
    return result


@app.route('/getwlyqbyid', methods=["GET", "POST"])
def getWlyqbyid():
    sjbh = request.args['sjbh']
    page = int(request.args['page'])
    limit = int(request.args['limit'])
    result = dict()
    result['code'] = 0
    result['msg'] = ''
    db = DBquery()
    sql = "select * from yx_yqxx where yqbh in (select yqbh from yx_sjgl where sjbh = '" + sjbh + "') "
    sjList = db.query(sql)
    result['count'] = len(sjList)
    l1 = list()
    for i in range(len(sjList)):
        data = dict()
        data['xh'] = i + 1
        data['yqbh'] = sjList[i][0]
        data['yqbt'] = sjList[i][1][0:35] + ".." if len(sjList[i][1]) > 20 else sjList[i][1]
        data['yqnr'] = sjList[i][2]
        data['yqly'] = sjList[i][3]
        data['hbsj'] = sjList[i][4]
        data['yqrm'] = sjList[i][5][0:10] + ".." if len(sjList[i][5]) > 10 else sjList[i][5]
        data['yqdm'] = sjList[i][6]
        l1.append(data)
    result['data'] = l1[(page - 1) * 10:page * 10]
    del db
    return result


@app.route('/trans', methods=["GET", "POST"])
def trans():
    src_lang = request.form['src_lang']
    tgt_lang = request.form['tgt_lang']
    src_text = request.form['src_text']
    data = {}
    """
    调用翻译接口
    成功code为100
    失败code为101
    """
    data['code'] = 100
    data['tgt_text'] = "hello world!"
    return data


@app.route('/del_news', methods=["GET", "POST"])
def del_news():
    id = request.form['id']
    db = DBquery()
    sql = "delete from tb_news_2 where ID = '" + id + "' "
    db.comm(sql)
    return "success"


@app.route('/update_news', methods=["GET", "POST"])
def update_news():
    id = request.form['id']
    des = request.form['des']
    key = request.form['key']
    db = DBquery()
    sql = "update tb_news_2 set keyword = '" + key + "' and description = '" + des + "' where ID = '" + id + "'  "
    print(sql)
    db.comm(sql)
    return "success"


@app.route('/fcqgfxAPI', methods=["GET", "POST"])
def fcqgfxAPI():
    text = request.form['text']  # 微博评论
    content = request.form['content']  # 微博正文
    data = {}
    result = requests.get("http://116.55.241.12:8080/zhfyfull/qgFxAPI?text=" + text)
    result = eval(result.text)[0]['label']
    if result == "0": text = "负面"
    if result == "1": text = "中性"
    if result == "2": text = "正面"
    """
    调用模型
    code:
        100 代表成功
        101 代表失败
    tgt:
        放置返回的结果
    """
    data['code'] = 100
    data['tgt'] = text
    return data


@app.route('/ssqgfxAPI', methods=["GET", "POST"])
def ssqgfxAPI():
    text = request.form['text']  # 微博评论
    content = request.form['content']  # 微博正文
    data = {}
    result = requests.get("http://116.55.241.12:8080/zhfyfull/qgFxAPI?text=" + text)
    result = eval(result.text)[0]['label']
    if result == "0": text = "负面"
    if result == "1": text = "中性"
    if result == "2": text = "正面"
    """
    调用模型
    code:
        100 代表成功
        101 代表失败
    tgt:
        放置返回的结果
    """
    data['code'] = 100
    data['tgt'] = text
    return data


@app.route('/keyphraseAPI', methods=["GET", "POST"])
def keyphraseAPI():
    text = request.form['text']  # 新闻
    text = text.replace('\n', '').replace('\r', '')
    data = {}
    result = get_keyphrase(text)
    """
    调用模型
    code:
        100 代表成功
        101 代表失败
    tgt:
        放置返回的结果
    """
    data['code'] = 100
    data['tgt'] = str(result)
    return data