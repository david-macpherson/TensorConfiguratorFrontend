#!/bin/bash

set -e 

TAG=tensorworks/sps-tensorconfigurator-frontend:0.0.0-devel
BUILD_LEGACY=false
BUILD_COREWEAVE_DEMO=false
COREWEAVE_DEMO_WS="wss://sps.tenant-tensorworks-demo.lga1.ingress.coreweave.cloud/car-config/ws"



while test $# -gt 0; do
  case "$1" in
    --legacy)
        # Set the build legacy flag to true
        BUILD_LEGACY=true
        shift
    ;;
    --coreweave-demo)
        # Set the build for coreweave demo flag
        BUILD_COREWEAVE_DEMO=true
        shift
    ;;    
    *)
        break
    ;;      
  esac
done

# Prompt the user to continue if building for legacy
if [ "$BUILD_LEGACY" = true ]; then
    read -p "You are building for a frontend for SPS v0.10.2 and below press enter to continue?"
fi

# Prompt the user to continue if building for legacy
if [ "$BUILD_COREWEAVE_DEMO" = true ]; then
    echo "You are building a frontend for the coreweave demo this will hardcode the signalling server address to"
    echo "  ${COREWEAVE_DEMO_WS}"
    read -p "press enter to continue?"
fi

# Only update the SPS_LEGACY_SIGNALLING_PATH_WS var to true if building for SPS versions 0.10.2 and below
if [ "$BUILD_LEGACY" = true ]; then
    sed -i "s/export var SPS_LEGACY_SIGNALLING_PATH_WS: boolean = false;/export var SPS_LEGACY_SIGNALLING_PATH_WS: boolean = ${BUILD_LEGACY};/g" src/const.ts
fi

if [ "$BUILD_COREWEAVE_DEMO" = true ]; then
    sed -i 's/let webSocketAddress = WEBSOCKET_URL/let webSocketAddress = "wss:\/\/sps.tenant-tensorworks-demo.lga1.ingress.coreweave.cloud\/car-config\/ws";/g' src/index.ts
fi

npm run build-dev-all

#Set the SPS_LEGACY_SIGNALLING_PATH_WS var back to false
if [ "$BUILD_LEGACY" = true ]; then
    sed -i "s/export var SPS_LEGACY_SIGNALLING_PATH_WS: boolean = ${BUILD_LEGACY};/export var SPS_LEGACY_SIGNALLING_PATH_WS: boolean = false;/g" src/const.ts
fi

#Set the SPS_LEGACY_SIGNALLING_PATH_WS var back to false
if [ "$BUILD_COREWEAVE_DEMO" = true ]; then
    sed -i 's/let webSocketAddress = "wss:\/\/sps.tenant-tensorworks-demo.lga1.ingress.coreweave.cloud\/car-config\/ws";/let webSocketAddress = WEBSOCKET_URL/g' src/index.ts
fi

exit

docker build -t $TAG .

docker push $TAG