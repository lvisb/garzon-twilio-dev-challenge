#!/bin/bash

source "./_vars.sh"

phone="$1"

http -f --verify=no \
  -A bearer -a "$bearerToken" \
  PATCH "$apiRemoteUrl/user" \
    name="John" \
    address="Lorem Ipsum Dolor" \
    latitude=0.000 \
    weatherLongitude=0.000 \
    timezone="America/Sao_Paulo" \
    phoneActive=true \
    phone="$phone" \
    zodiacSign="Leo" \

