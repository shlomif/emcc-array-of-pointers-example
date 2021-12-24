#! /bin/bash

set -e -x
export EMCC_DEBUG=1
rm -rf dist/
mkdir -p dist
objext=bc
emcc -O3 src/c_array_strings.c src/main.cpp src/myfunc.cpp src/myclass.cpp -Iinclude -o dist/mysqrt."$objext"
emcc -O3 dist/mysqrt."$objext" -o dist/mysqrt.js -s EXPORTED_FUNCTIONS='["_array_set", "_gen_array", "_mysqrtC", "_mysqrtArrayC", "_createMyClassC", "_deleteMyClassC", "_setMyClassValueC", "_getMyClassAnswerC"]' --memory-init-file 0 --pre-js  wrap/pre.js --post-js wrap/post.js
export EMCC_DEBUG=""
