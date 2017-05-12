#!/bin/bash

echo 'running Back-end API Unit tests...'
cd ../Code && npm test

echo 'running Front-end Web App Unit tests...'
cd ./client && npm test
