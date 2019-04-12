#!/usr/bin/env bash

docker-compose -f 'docker-compose.ci.yml' -p ci up --build --abort-on-container-exit
#exit $(docker wait ci_watchflix_1)
