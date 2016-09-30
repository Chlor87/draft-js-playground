#!/usr/bin/env bash

[ -z "$DOCKER" ] || [ -z "$PUBLIC" ] && exit 0;

echo "Copying public to ${PUBLIC}"

cp -R ./public/* ${PUBLIC};
exit 0
