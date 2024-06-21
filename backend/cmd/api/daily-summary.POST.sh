#!/bin/bash

source "./_vars.sh"

code=$1

http -f --verify=no \
  -A bearer -a "$bearerToken" \
  POST "$apiUrl/_private/daily-summary" \

