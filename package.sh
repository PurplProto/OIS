#!/bin/bash

shopt -s extglob

RED='\033[0;31m'
NC='\033[0m'

REQUIRED_DEPENDECIES=(
  jq
  zip
)

DEBUG=0
VERSION=0.0.0

SRC_DIR=$(pwd)
PACKAGED_DIR="packaged"
WORKING_DIR="/tmp/ois-packaging"

COMMON_DIRS=(
    main/*
    popup/*
)
COMMON_FILES=(
  manifest.json
)
CHROME_FILES=(
    icons/*chrome*
)
FIREFOX_FILES=(
    icons/*firefox*
)

for DEPENDENCY in ${REQUIRED_DEPENDECIES[@]}
do
  if [[ ! $(which $DEPENDENCY) ]]; then
    echo -e "Cannot continue as a required dependency ${RED}${DEPENDENCY}${NC} is not installed." 2>&1
    exit 1
  fi
done


print_help() {
  echo -e "Options:
  \t-d\t\t Create a debug folder for Chrome, instead of packaging it.
  \t-h\t\t This help message."
}


while getopts ":dh" opt; do
  case $opt in
    d)
      DEBUG=1
      shift ;;
    h)
      print_help
      exit 0
      shift ;;
    \?)
      echo "Invalid option: -$OPTARG" >&2
      print_help
      exit 1
      shift ;;
  esac
done

VERSION=$(cat manifest.json | jq '.version')
VERSION=${VERSION//@(\")}

if [ -d $PACKAGED_DIR/ ]; then
  rm -r $PACKAGED_DIR/*
else
  mkdir $PACKAGED_DIR
fi

mkdir -p $WORKING_DIR


for FILE in ${COMMON_DIRS[@]}
do
  mkdir -p $WORKING_DIR/chrome/$(dirname $FILE)
  mkdir -p $WORKING_DIR/firefox/$(dirname $FILE)

  cp $FILE $WORKING_DIR/chrome/$FILE
  cp $FILE $WORKING_DIR/firefox/$FILE
done

for FILE in ${COMMON_FILES[@]}
do
  cp $FILE $WORKING_DIR/chrome/$FILE
  cp $FILE $WORKING_DIR/firefox/$FILE
done

for FILE in ${CHROME_FILES[@]}
do
  mkdir -p $WORKING_DIR/chrome/$(dirname $FILE)

  cp $FILE $WORKING_DIR/chrome/${FILE//@(_chrome)}
done

for FILE in ${FIREFOX_FILES[@]}
do
  mkdir -p $WORKING_DIR/firefox/$(dirname $FILE)

  cp $FILE $WORKING_DIR/firefox/${FILE//@(_firefox)}
done

cd ${WORKING_DIR}/chrome

if [[ $DEBUG -gt 0 ]]
then
  mkdir -p "${SRC_DIR}/${PACKAGED_DIR}/Chrome-v${VERSION}"
  cp -r * "${SRC_DIR}/${PACKAGED_DIR}/Chrome-v${VERSION}"
else
  zip -r9 "${SRC_DIR}/${PACKAGED_DIR}/Chrome-v${VERSION}.zip" *
fi

cd ${WORKING_DIR}/firefox

zip -r9 "${SRC_DIR}/${PACKAGED_DIR}/FireFox-v${VERSION}.zip" *


rm -r $WORKING_DIR
