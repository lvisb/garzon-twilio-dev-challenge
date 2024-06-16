#!/bin/bash

source "./_vars.sh"

bearer=$1

http -f \
  -A bearer -a "$bearer" \
  PATCH "$apiUrl/user" \
    name="John" \
    horoscope=true \
    weather=true \
    latitude=0.000 \
    longitude=0.000 \
    motivationalQuotes=true \

