#!/usr/bin/env bash
git config core.autocrlf input
./node_modules/.bin/nsp audit-package
./node_modules/.bin/grunt githooks
#npm-check-updates -f '/^(?!ideal).*/'
