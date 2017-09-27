# Translator

### Journal
#### Day 1 - Setting up django and database, and research language library  
Language library [Googletrans](https://pypi.python.org/pypi/googletrans) - a free and unlimited python library that implemented Google Translate API.  

#### Day 2 - Set up django settings in both local and deploy, and implement Googletrans  
Change the django setting module in both `manage.py` and `wsgi.py` files  
Create django env variables for database details using [django-environ](http://django-environ.readthedocs.io/en/latest/#how-to-use)  

Test Googletrans library implementations (`engine/`)

#### Day 3 - Learning Angular 2 and set up dummy views  
Clone the quickstart files and followed through the tutorials on [Tour of Heroes](https://angular.io/guide/quickstart)  

#### Day 4 - Set up Angular Services and CSRF token  
The server and client are hosted on different port, must deal with CORS.  
> By default django rest framework uses sessionAuthentication, implementing  
Angular's XSRFStrategy module for creating cookie token works for CORS request.  

#### Day 5 - Ready to get this babe deployed  
Deploy project to AWS EC2, database to RDS  
Running initial migrate to create tables  
Install gunicorn and nginx  

---
Testing gunicorn - `gunicorn translator.wsgi:application --bind ec2-18-221-136-72.us-east-2.compute.amazonaws.com:8000`  
Creating gunicorn bash script and upstart for sheduling - base on founded template  

```
nano gunicorn_script.sh
nano /etc/init/translatorApp.conf
```

Testing gunicorn script and upstart - `./gunicorn_script.sh`, `start projectname`   

---  
Creating nginx script to listen to gunicorn using founded template - `nano /etc/nginx/nginx.conf`  

```
# nginx commands
nano /etc/nginx/nginx.conf
# nginx should listen on 0.0.0.0:80 -> gunicorn listening on 127.0.0.1:8000
/etc/init.d/nginx stop
/etc/init.d/nginx start
/etc/init.d/nginx reload
# debug
nano /var/log/nginx/error.log
```

Checking port status - `sudo lsof -i -P -n | grep LISTEN`  

--- 

#### Day 6 Deploy angular  
Follow angular docs template on Webpack to deploy.  

```
# exports dist folder
npm run build:prod
```

Set up django STATIC_DIRS to point to the dist folder  
STATIC_ROOT to /opt/projectname/static/   
./manage.py collectstatic to create the folder  
Configure the path on Nginx

Ta-dah! http://ec2-18-221-136-72.us-east-2.compute.amazonaws.com/static/  




