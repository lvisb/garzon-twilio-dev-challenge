#!/bin/bash

source "./_vars.sh"

grantId=$1

http -f --verify=no \
  -A bearer -a "$nylasApiKey" \
  GET "$nylasApiUrl/grants/$grantId/events" \
    calendar_id==primary \
    expand_recurring==true \
    start==1718668800 \
    end==1718841599

