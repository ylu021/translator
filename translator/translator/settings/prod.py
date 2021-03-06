from translator.settings.common import *

import environ

environ.Env.read_env('.env')
#
# CORS_ORIGIN_WHITELIST = (
#     'localhost:3000',
# )

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': os.environ['PROD_DB_NAME'],
        'USER' : os.environ['PROD_DB_USER']    ,
        'PASSWORD' : '12345678',
        'HOST' : os.environ['PROD_DB_HOST'],
        'PORT' : '5432',
    }
}

ALLOWED_HOSTS = ['ec2-18-221-136-72.us-east-2.compute.amazonaws.com', ]
STATIC_ROOT = '/home/ec2-user/translator/translator/static'
