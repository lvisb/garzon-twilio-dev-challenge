#!/bin/bash

source "./_vars.sh"

address="$1"

http -f --verify=no \
  GET "$googleMapsApiUrl/geocode/json" \
    address=="$address" \
    key==$googleMapsApiKey \

