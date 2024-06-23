#!/bin/bash

source "./_vars.sh"

http -f --verify=no \
  -A bearer -a "$bearerToken" \
  GET "$apiUrl/user" \
