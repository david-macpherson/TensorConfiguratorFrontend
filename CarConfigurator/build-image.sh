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
VERSION=0.0.0-devel-metrics


WEBSOCKET_URL=""
BUCCANEER_URL=""

POD_DEL=false

while test $# -gt 0; do
  case "$1" in
    --aws)
        # Set the build for coreweave demo flag
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

TAG=$REGISTRY/$REPO/$IMAGE:$VERSION-$PROVIDER


echo "--------------------------------"

echo "PROVIDER:         $PROVIDER"

echo "REGISTRY:         $REGISTRY"
echo "REPO:             $REPO"
echo "IMAGE:            $IMAGE"
echo "VERSION:          $VERSION"
echo "TAG:              $TAG"

echo "ENABLE_METRICS:   $ENABLE_METRICS"

echo "WEBSOCKET_URL:    $WEBSOCKET_URL"
echo "BUCCANEER_URL:    $BUCCANEER_URL"

echo "--------------------------------"


# Create an emtpy .env file
echo -e "" > .env

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
