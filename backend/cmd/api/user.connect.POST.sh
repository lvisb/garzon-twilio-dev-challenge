#!/bin/bash

source "./_vars.sh"

code=$1

http -f --verify=no \
  POST "$apiRemoteUrl/user/connect" \
    code="$code" \

