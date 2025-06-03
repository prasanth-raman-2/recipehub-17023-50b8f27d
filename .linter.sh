#!/bin/bash
cd /home/kavia/workspace/code-generation/recipehub-17023-50b8f27d/recipehub
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

