#!/bin/bash

source "./_vars.sh"

phone=$1
code=$2

http -f \
  -A bearer -a "$bearerToken" \
  PATCH "$apiUrl/user/verify-code" \
    phone="$1" \
    code=$2 \
