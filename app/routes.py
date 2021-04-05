import json

from flask import render_template, request
from app import app
from app.Dao.DBquery import DBquery


@app.route('/index')
def index():
    return render_template('reg.html')


@app.route('/')
@app.route('/login')
def login():
    return render_template('login.html')


@app.route('/check', methods=["GET", "POST"])
def check():
    result = dict()
    data = request.form
    name = data['name']
    pwd = data['pwd']
    if name == "admin" and pwd == "123":
        result["code"] = 100
        result["msg"] = "success"
    else:
        result["code"] = 101
        result["msg"] = "failure"
    return result


@app.route('/rdsj')
def rdsj():
    return render_template('rdsj.html')


@app.route('/gjdy')
def gjdy():
    return render_template('gjdy.html')


@app.route('/home')
def home():
    return render_template('home.html')


@app.route('/wlyq')
def wlyq():
    return render_template('wlyq.html')


@app.route('/rdsjyq', methods=["GET", "POST"])
def rdsjYq():
    sjbh = request.args['sjbh']
    data = {}
    data['sjbh'] = sjbh
    print(sjbh)
    return render_template('rdsjyq.html', data=data)


@app.route('/ckxq', methods=["GET", "POST"])
def ckxq():
    data = {}
    yqbh = request.args['yqbh']
    db = DBquery()
    sql = "select * from yx_yqxx where yqbh = '" + yqbh + "' "
    print(sql)
    sjList = db.query(sql)
    data['yqbt'] = sjList[0][1]
    data['yqnr'] = str(sjList[0][2])
    data['yqly'] = sjList[0][3]
    data['hbsj'] = str(sjList[0][4])
    data['yqrm'] = sjList[0][5]
    data['yqdm'] = sjList[0][6]
    del db
    return render_template('yqxq.html', data=data)


@app.route('/translate')
def translate():
    return render_template('translate.html')

@app.route('/fcqgfx')
def fcqgfx():
    return render_template('fcqgfx.html')


@app.route('/ssqgfx')
def ssqgfx():
    return render_template('ssqgfx.html')

@app.route('/keyphrase')
def keyphrase():
    return render_template('keyphrase.html')

@app.route('/bz', methods=["GET", "POST"])
def bz():
    return render_template('biaozhu.html')


@app.route('/bzupdate', methods=["GET", "POST"])
def bzupdate():
    data = {}
    id = request.args['id']
    db = DBquery()
    sql = "select * from tb_news_2 where id = '"+id+"' "
    sjList = db.query(sql)
    data['id'] = id
    data['title'] = sjList[0][1]
    data['content'] = sjList[0][2]
    data['key'] = sjList[0][3]
    data['url'] = sjList[0][4]
    data['des'] = sjList[0][6]
    return render_template('bzupdate.html',data = data)


@app.route('/getbzdata', methods=["GET", "POST"])
def getBzData():
    page = int(request.args['page'])
    result = dict()
    result['code'] = 0
    result['msg'] = ''
    db = DBquery()
    sql = "select * from tb_news_2 order by id"
    sjList = db.query(sql)
    result['count'] = len(sjList)
    l1 = list()
    for i in range(len(sjList)):
        data = dict()
        data['xh'] = i+1
        data['id'] = sjList[i][0]
        data['title'] = sjList[i][1]
        data['content'] = sjList[i][2]
        data['keyword'] = sjList[i][3]
        data['url'] = sjList[i][4]
        data['des'] = sjList[i][6]
        l1.append(data)
    result['data'] = l1[(page-1)*10:page*10]
    del db
    return result