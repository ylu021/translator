# Translator  

Link to [Journal](https://github.com/ylu021/translator/blob/master/journal.md)  

## Stacks
Libraries - Googletrans, django-environ etc.     
Client - Angular 2 + Webpack  
Server - django + django rest framework  
Database - Postgres  
Deploy - gunicorn + nginx  

# Developing Installation  
`git clone https://github.com/ylu021/translator.git`

# Local branch
```
git checkout local
cd translator/translator
./manage.py migrate
./manage.py runserver
```

# Project structure
```
/translator - the django project, server
  /translatorApp

/client - the angular project, client
  /dist - the bundle
  /src
    /app - app files
```
