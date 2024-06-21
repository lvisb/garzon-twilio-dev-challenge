#!/bin/bash

source "./_vars.sh"

phone=$1
code=$2

http -f --verify=no \
  -A bearer -a "$bearerToken" \
  PATCH "$apiRemoteUrl/user/verify-code" \
    phone="$1" \
    code=$2 \
