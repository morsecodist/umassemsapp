#!/usr/bin/env bash

# Build app, run server and watch tasks in parallel
# Will watch for changes and update automatically while serving
gulp build; node server & gulp watch
