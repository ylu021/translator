from translator.settings.common import *
import os
import environ

environ.Env.read_env('.env')
# 
# CORS_ORIGIN_WHITELIST = (
#     'localhost:3000',
# )
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': os.environ['LOCAL_DB_NAME'],
	'USER': os.environ['LOCAL_DB_USER'],
	'PASSWORD': os.environ['LOCAL_DB_PASSWORD'],
	'HOST': os.environ['LOCAL_DB_HOST'],
	'PORT': '5432'
    }
}
