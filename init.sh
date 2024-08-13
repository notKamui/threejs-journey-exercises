#!/bin/sh

DIRECTORY=$1
if [ -z $DIRECTORY ]; then
    echo "Please provide a folder name"
    exit 1
fi

# install deps
cd $DIRECTORY
bunx @antfu/eslint-config -y && \
bun i && \
bun add -D typescript @types/three
if [ $? -ne 0 ]; then
    echo 'Error: failed to install the dependencies.' >&2
    exit 1
fi

# copy all config
cd ..
cp -f .gitignore.inner $DIRECTORY/.gitignore && \
cp -f eslint.config.js $DIRECTORY/eslint.config.js && \
cp -f tsconfig.json.base $DIRECTORY/tsconfig.json && \
cp -f .editorconfig $DIRECTORY/.editorconfig && \
if [ $? -ne 0 ]; then
    echo 'Error: failed to copy the config files to the correct location.' >&2
    exit 1
fi

# add 'lint' and 'lint:fix' to the script section of the package.json
cd $DIRECTORY
node -e "const fs = require('fs'); const pkg = JSON.parse(fs.readFileSync('package.json')); pkg.scripts = { ...pkg.scripts, build: 'tsc && vite build', lint: 'eslint .', 'lint:fix': 'eslint --fix .' }; fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));"
bun run lint:fix
