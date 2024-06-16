#!/bin/bash

source "./_vars.sh"

code=$1

http -f \
  POST "$apiUrl/user/connect" \
    code="$code" \

