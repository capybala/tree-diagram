#!/bin/sh

aws s3 cp --recursive --exclude '.git/*' --exclude 'node_modules/*' . s3://tree.capybala.com/
