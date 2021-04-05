import cx_Oracle,os
os.environ['NLS_LANG'] = 'SIMPLIFIED CHINESE_CHINA.UTF8'
import pymysql

def getData(sjbh):
    net = "zhfyssfw/zhfyssfw@116.55.241.12:1521/ORCLPDB"
    conn = cx_Oracle.connect(net)
    cursor = conn.cursor()
    sql1 = "select t1.YQBH,t1.YQBT,t1.YQNR,t1.YQLY,t1.FBSJ,t2.YQRM," \
           "t2.YQDM from YD_YQXX t1, YD_YQGD t2 where t1.YQBH in " \
           "(select YQBH from YD_RDSJGL where SJBH = '"+sjbh+"') and t1.YQBH = t2.YQBH "
    cursor.execute(sql1)
    rows = cursor.fetchall()
    dic = []
    result = []
    for i in rows:
        if i[1] not in dic:
            dic.append(i[1])
            j=[]
            j.append(i[0])
            j.append(i[1])
            j.append(str(i[2]))
            j.append(i[3])
            j.append(str(i[4])[0:10])
            if not i[5]:
                j.append("null")
            else:
                j.append(i[5])
            if not i[6]:
                j.append("null")
            else:
                j.append(i[6])
            result.append(j)
    cursor.close()
    conn.close()
    return result


def saveData(result):
    db = pymysql.connect(host='localhost', user='root', password='123456', db='yxxt', port=3306)
    cursor = db.cursor()
    for i in result:
        sql2 = "insert into yx_yqxx values ('"+i[0]+"','"+i[1]+"','"+i[2]+"','"+i[3]+"','"+i[4]+"','"+i[5]+"','"+i[6]+"') "
        cursor.execute(sql2)
        db.commit()

    cursor.close()
    db.close()

def saveData1(result,sjbh):
    db = pymysql.connect(host='localhost', user='root', password='123456', db='yxxt', port=3306)
    cursor = db.cursor()
    for i in result:
        yqbh = i[0]
        sql2 = "insert into yx_sjgl values ('"+sjbh+"','"+yqbh+"')"
        cursor.execute(sql2)
        db.commit()
    cursor.close()
    db.close()

if __name__ == '__main__':

    list1 = [
        'c54ef120-a960-4c64-a60a-245c16ba2bef',
        'ec8ee336-812f-408e-b630-95c8166aa6ac',
        'faa921ca-925f-4205-87b0-6e567b900e81',
        '0b7b48d3-94f9-4921-9083-c4da44b83713',
        '37f097e1-263a-470b-82ee-1b4a406f0118',
        'ee6435b6-b347-4dfb-a519-183b51d620c9',
        'de0db94f-9c07-4902-b9b2-dca5e2dabe2b',
        '6f208b65-2e11-4d2e-9359-87999a0ec875',
        '4352bfa8-ddc9-4fba-b449-815a427292ff',
        'bb6322e6-7312-46f1-852a-fdf45aaae8d4'
    ]
    for sjbh in list1:
        result = getData(sjbh)
        saveData(result)
        saveData1(result,sjbh)