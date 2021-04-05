import pymysql


class DBquery():
    def __init__(self):
        self.user = 'root'
        self.pwd = '123456'
        self.db = 'yxxt'#yxxt
        self.port = 3306
        self.host = 'localhost'

    def query(self,sql):
        db = pymysql.connect(host=self.host, user=self.user,
                             password=self.pwd, db=self.db, port=self.port)
        cursor = db.cursor()
        cursor.execute(sql)
        results = cursor.fetchall()  # 查询数据的
        cursor.close()
        db.close()
        return results

    def comm(self,sql):
        db = pymysql.connect(host=self.host, user=self.user,
                             password=self.pwd, db=self.db, port=self.port)
        cursor = db.cursor()
        cursor.execute(sql)
        db.commit()  # 更新数据的
        cursor.close()
        db.close()

    def __del__(self):
        print('DB finish···')