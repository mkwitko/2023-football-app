#!/bin/sh
currentDir=$(pwd)
folderName=$(basename "$currentDir")


# Create project
echo "Creating project $folderName"

if [ ! -d "src/assets" ]; then
mkdir src/assets
fi

if [ ! -d "resources" ]; then
mkdir resources
fi


cd ../ && cd football-app && 
cp src/assets/* ../$folderName/src/assets &&
cp resources/* ../$folderName/resources &&
cp tailwind.config.js ../$folderName &&
cp .env ../$folderName &&
cp capacitor.config.ts ../$folderName && npm i && ionic serve

