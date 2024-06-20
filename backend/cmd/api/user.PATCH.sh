#!/bin/bash

source "./_vars.sh"

phone="$1"

http -f \
  -A bearer -a "$bearerToken" \
  PATCH "$apiUrl/user" \
    name="John" \
    address="Av. 123" \
    latitude=0.000 \
    weatherLongitude=0.000 \
    timezone="America/Sao_Paulo" \
    phoneActive=true \
    phone="$phone" \
    zodiacSign="Leo" \

