#!/bin/bash

source "./_vars.sh"

http -f \
  -A bearer -a "$bearerToken" \
  PATCH "$apiUrl/user" \
    name="John" \
    horoscope=true \
    weather=true \
    latitude=0.000 \
    weatherLongitude=0.000 \
    motivationalQuotes=true \
    timezone="America/Sao_Paulo" \

