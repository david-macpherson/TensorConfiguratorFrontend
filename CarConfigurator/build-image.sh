#!/bin/bash

set -e 


PROVIDER="local"

COREWEAVE_WS="wss://sps.tenant-tensorworks-demo.lga1.ingress.coreweave.cloud/car-config/ws"
COREWEAVE_BUCCANEER="https://metrics.tenant-tensorworks-demo.lga1.ingress.coreweave.cloud/event"

AWS_BUCCANEER="https://sps.tw-testing.com/event"

ENABLE_METRICS=false

REGISTRY=docker.io
REPO=tensorworks
IMAGE=sps-tensorconfigurator-frontend
VERSION=0.0.0-devel
VERSION_METRICS=0.0.0-devel-metrics

TAG=""

WEBSOCKET_URL=""
BUCCANEER_URL=""

POD_DEL=false

while test $# -gt 0; do
  case "$1" in
    --tag)
        # Set the tag to build to
        shift
        REPO=$1
        shift
    ;;
    --local)
        # Set the build for local demo flag
        PROVIDER="local"
        shift
    ;;
    --aws)
        # Set the build for aws provider
        PROVIDER="aws"
        BUCCANEER_URL=$AWS_BUCCANEER
        shift
    ;;
    --coreweave-demo)
        PROVIDER="coreweave"
        # Set the build for coreweave demo flag
        BUILD_COREWEAVE_DEMO=true
        WEBSOCKET_URL=$COREWEAVE_WS
        BUCCANEER_URL=$COREWEAVE_BUCCANEER
        shift
    ;;
    --coreweave)
        PROVIDER="coreweave"
        WEBSOCKET_URL=$COREWEAVE_WS
        BUCCANEER_URL=$COREWEAVE_BUCCANEER
        shift
    ;;
    --metrics)
        ENABLE_METRICS=true
        shift
    ;;    

    --pod-del)
        POD_DEL=true
        shift
    ;;    
    *)
        break
    ;;      
  esac
done

if [[ ! -z "$WEBSOCKET_URL" ]]; then
    TAG=$REGISTRY/$REPO/$IMAGE:$VERSION-$PROVIDER
fi


if [ "$ENABLE_METRICS" = false ]; then
    BUCCANEER_URL=""
fi

# Check if metrics has been enabled and overide the Version to use the metrics
if [ "$ENABLE_METRICS" = true ]; then
    TAG=$REGISTRY/$REPO/$IMAGE:$VERSION_METRICS-$PROVIDER
fi

echo "--------------------------------"

echo "PROVIDER:         $PROVIDER"

echo "REGISTRY:         $REGISTRY"
echo "REPO:             $REPO"
echo "IMAGE:            $IMAGE"
echo "VERSION:          $VERSION"
echo "TAG:              $TAG"

echo "ENABLE_METRICS:   $ENABLE_METRICS"

if [[ ! -z "$WEBSOCKET_URL" ]]; then
    echo "WEBSOCKET_URL:    $WEBSOCKET_URL"
fi

if [[ ! -z "$BUCCANEER_URL" ]]; then
    echo "BUCCANEER_URL:    $BUCCANEER_URL"
fi 

echo "--------------------------------"

# Create an emtpy .env file
echo -n > .env

# If the websocket url has been set then use that
if [[ ! -z "$WEBSOCKET_URL" ]]; then
    echo -e "WEBSOCKET_URL=$WEBSOCKET_URL" >> .env
fi

# Check if metrics has been enabled
if [ "$ENABLE_METRICS" = true ]; then
    
    # Set the buccaneer URL
    if [[ ! -z "$BUCCANEER_URL" ]]; then 
        echo -e "BUCCANEER_URL=$BUCCANEER_URL" >> .env
    fi



    # Set the Enable metrics
    echo -e "ENABLE_METRICS=$ENABLE_METRICS" >> .env
fi

# Build the project as dev
npm run build-dev

# Build the docker container
docker build -t $TAG .

# Push the docker container
docker push $TAG
