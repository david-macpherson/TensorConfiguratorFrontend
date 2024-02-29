#!/bin/bash

set -e 

TAG=tensorworks/sps-tensorconfigurator-frontend:0.0.0-devel

npm run build-dev-all

docker build -t $TAG .

docker push $TAG
