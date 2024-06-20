#!/bin/bash

source "./_vars.sh"

address="$1"

http -f \
  -A bearer -a "$bearerToken" \
  GET "$apiUrl/user/address" \
    address=="$1" \
