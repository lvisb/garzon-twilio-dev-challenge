#!/bin/bash

source "./_vars.sh"

address="$1"

http -f --verify=no \
  -A bearer -a "$bearerToken" \
  DELETE "$apiUrl/user" \
