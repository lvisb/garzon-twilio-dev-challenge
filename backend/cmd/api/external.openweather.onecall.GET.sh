#!/bin/bash

source "./_vars.sh"

lat=$1
lon=$2

http -f --verify=no \
  GET "$openWeatherApiUrl/onecall" \
    lat==$lat \
    lon==$lon \
    exclude==current,minutely,hourly,alerts \
    appid==$openWeatherApiKey \

