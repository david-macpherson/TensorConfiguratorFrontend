#!/bin/bash

npm run build-all

docker build -t docker.io/dpholden/carconfigurator-frontend:5.2-11 .

docker push docker.io/dpholden/carconfigurator-frontend:5.2-11