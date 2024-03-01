#!/bin/bash

set -e 

TAG=tensorworks/sps-tensorconfigurator-frontend:0.0.0-devel
BUILD_LEGACY=false



while test $# -gt 0; do
  case "$1" in
    --legacy)
        # Set the build legacy flag to true
        BUILD_LEGACY=true
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

# Only update the SPS_LEGACY_SIGNALLING_PATH_WS var to true if building for SPS versions 0.10.2 and below
if [ "$BUILD_LEGACY" = true ]; then
    sed -i "s/export var SPS_LEGACY_SIGNALLING_PATH_WS: boolean = false;/export var SPS_LEGACY_SIGNALLING_PATH_WS: boolean = ${BUILD_LEGACY};/g" src/const.ts
fi

npm run build-dev-all

#Set the SPS_LEGACY_SIGNALLING_PATH_WS var back to false
if [ "$BUILD_LEGACY" = true ]; then
    sed -i "s/export var SPS_LEGACY_SIGNALLING_PATH_WS: boolean = ${BUILD_LEGACY};/export var SPS_LEGACY_SIGNALLING_PATH_WS: boolean = false;/g" src/const.ts
fi

docker build -t $TAG .

docker push $TAG
