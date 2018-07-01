# coding: utf-8
# coding: utf-8


_DBUSER = "root" # 数据库用户名
_DBPASS = "nEXCruN1V5s1" # 数据库密码
_DBHOST = "139.199.24.75" # 数据库地址
_DBNAME = "happy" # 数据库名称

#config
SECRET_KEY = 'flaskblog'
BLOG_TITLE = 'Welcome. | My Blog'
BLOG_URL = 'http://www.demo.com'
BLOG_NAME = 'Blog'

#admin info
ADMIN_INFO = ''
ADMIN_EMAIL = ''
ADMIN_USERNAME = ''

class rec: pass

rec.database = 'mysql://%s:%s@%s/%s' % (_DBUSER, _DBPASS, _DBHOST,_DBNAME)
rec.description = u"happy"
rec.url = ''
rec.paged = 8
rec.archive_paged = 20
rec.admin_username = 'happy'
rec.admin_email = ''
rec.admin_password = ''
rec.default_timezone = "Asia/Shanghai"
