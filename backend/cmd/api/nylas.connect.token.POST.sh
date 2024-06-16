#!/bin/bash

source "./_vars.sh"

code=$1

http -f \
  POST "$apiUrl/nylas/connect/token" \
    code="$code" \

