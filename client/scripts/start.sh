# Set up ClIENT_PORT variable from .env
if [ -f ../.env ]
then
  export $(cat ../.env | grep 'CLIENT_PORT' | xargs)
fi

# Init env variable from which react takes port
export PORT=$CLIENT_PORT

react-scripts start
