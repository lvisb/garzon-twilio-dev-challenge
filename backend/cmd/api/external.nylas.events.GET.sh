#!/bin/bash

source "./_vars.sh"

grantId=$1

http -f --verify=no \
  -A bearer -a "$nylasApiKey" \
  GET "$nylasApiUrl/grants/$grantId/events" \
    calendar_id==primary \
    limit==5

