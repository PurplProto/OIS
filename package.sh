#!/bin/bash

shopt -s extglob

RED='\033[0;31m'
NC='\033[0m'

DEBUG=0
VERSION=0.0.0

SRC_DIR=$(pwd)
PACKAGED_DIR="packaged"
WORKING_DIR="/tmp/ois-packaging"

REQUIRED_DEPENDECIES=(
    jq
    zip
)

POPUPDIR=dist/OISPopup
MANIFEST=src/manifest.json
POPUPHTML=src/Popup.html
POPUPCSS=src/css/materialize.min.css

COMMON_DIRS=(
    dist/OpenInSteam/*
)
CHROME_FILES=(
    src/icons/*chrome*
)
FIREFOX_FILES=(
    src/icons/*firefox*
)

for DEPENDENCY in ${REQUIRED_DEPENDECIES[@]}
do
    if [[ ! $(which $DEPENDENCY) ]]; then
        echo -e "${RED}Cannot continue! Missing a required dependency:${NC} ${DEPENDENCY} ${RED}is not installed.${NC}" 2>&1
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

VERSION=$(cat src/manifest.json | jq '.version')
VERSION=${VERSION//@(\")}

if [ -d $PACKAGED_DIR/ ]; then
    rm -r $PACKAGED_DIR/*
else
    mkdir $PACKAGED_DIR
fi


mkdir -p $WORKING_DIR/chrome/
mkdir -p $WORKING_DIR/firefox/

cp $MANIFEST  $WORKING_DIR/chrome/${MANIFEST#src/}
cp $MANIFEST  $WORKING_DIR/firefox/${MANIFEST#src/}
cp $POPUPHTML $POPUPDIR/${POPUPHTML#src/}
cp $POPUPCSS  $POPUPDIR/${POPUPCSS#src/css/}

COMMON_DIRS+=("${POPUPDIR}/*")

for DIR in ${COMMON_DIRS[@]}
do
    TEMPD=${DIR#dist/}

    mkdir -p $WORKING_DIR/chrome/$(dirname $TEMPD)
    mkdir -p $WORKING_DIR/firefox/$(dirname $TEMPD)

    cp $DIR $WORKING_DIR/chrome/$TEMPD
    cp $DIR $WORKING_DIR/firefox/$TEMPD
done

for FILE in ${CHROME_FILES[@]}
do
    TEMPF=${FILE#src/}

    mkdir -p $WORKING_DIR/chrome/$(dirname $TEMPF)

    cp $FILE $WORKING_DIR/chrome/${TEMPF//@(_chrome)}
done

for FILE in ${FIREFOX_FILES[@]}
do
    TEMPF=${FILE#src/}

    mkdir -p $WORKING_DIR/firefox/$(dirname $TEMPF)

    cp $FILE $WORKING_DIR/firefox/${TEMPF//@(_firefox)}
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
