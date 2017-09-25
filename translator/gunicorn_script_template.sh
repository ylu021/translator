
#!/bin/bash

NAME=                              #Name of the application (*)
LOGFILE=/var/log/gunicorn/error.log
LOGDIR=$(dirname $LOGFILE)
DJANGODIR=/home/ec2-user/projectname             # Django project directory (*)
#SOCKFILE=/home/ec2-user/projectname/run/gunicorn.sock        # we will communicate using this unix socket (*)
USER=                                        # the user to run as (*)
GROUP=                                     # the group to run as (*)
NUM_WORKERS=                                     # how many worker processes should Gunicorn spawn (*)
DJANGO_SETTINGS_MODULE=projectname.settings.prod            # which settings file should Django use (*)
DJANGO_WSGI_MODULE=projectname.wsgi                     # WSGI module name (*)

echo "Starting $NAME as `whoami`"

# Activate the virtual environment
cd $DJANGODIR
export WORKON_HOME=[virtualenv path]
export VIRTUALENVWRAPPER_PYTHON=/usr/bin/python
source /usr/local/bin/virtualenvwrapper.sh
workon virtualenvname
test -d $LOGDIR || mkdir -p $LOGDIR
GUNIPATH=gunicornpath
export DJANGO_SETTINGS_MODULE=$DJANGO_SETTINGS_MODULE
export PYTHONPATH=$DJANGODIR:$PYTHONPATH

# Create the run directory if it doesn't exist
RUNDIR=$(dirname $SOCKFILE)
test -d $RUNDIR || mkdir -p $RUNDIR

# PORT
PORT=8000

# Start your Django Unicorn
# Programs meant to be run under supervisor should not daemonize themselves (do not use --daemon)
exec ${GUNIPATH} ${DJANGO_WSGI_MODULE}:application \
  --name $NAME \
  --workers $NUM_WORKERS \
  --user $USER \
  #--bind=unix:$iSOCKFILE \
   --bind=http://[::]:${PORT} \
   --log-file=$LOGFILE 2>>$LOGFILE
