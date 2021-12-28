app_version="latest"

# Set values from flags
while getopts v: flag
do
    case "${flag}" in
        v) app_version=${OPTARG};;
    esac
done

# Build images
docker-compose -f docker-compose.prod.yml build

# Prepare tags
docker tag react-client-prod 691775529873.dkr.ecr.eu-west-3.amazonaws.com/qas-client:${app_version}
docker tag nestjs-api-prod 691775529873.dkr.ecr.eu-west-3.amazonaws.com/qas-server:${app_version}
docker tag postgres:14-alpine 691775529873.dkr.ecr.eu-west-3.amazonaws.com/qas-db:${app_version}

# Push images
docker push 691775529873.dkr.ecr.eu-west-3.amazonaws.com/qas-client:${app_version}
docker push 691775529873.dkr.ecr.eu-west-3.amazonaws.com/qas-server:${app_version}
docker push 691775529873.dkr.ecr.eu-west-3.amazonaws.com/qas-db:${app_version}
