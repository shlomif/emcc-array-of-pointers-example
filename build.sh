#! /bin/bash

set -e -x
export EMCC_DEBUG="0"
rm -rf dist/
mkdir -p dist
npm i amdefine
objext=bc
emcc -O0 -g src/c_array_strings.c src/main.cpp src/myfunc.cpp src/myclass.cpp -Iinclude -o dist/mysqrt."$objext"
emcc -O0 -g dist/mysqrt."$objext" -o dist/mysqrt.js -s EXPORTED_FUNCTIONS='["_array_free", "_array_print", "_array_set", "_gen_array", "_mysqrtC", "_mysqrtArrayC", "_createMyClassC", "_deleteMyClassC", "_setMyClassValueC", "_getMyClassAnswerC"]' -s EXPORTED_RUNTIME_METHODS="['allocate', 'cwrap', 'getValue', 'intArrayFromString', 'setValue', 'ALLOC_STACK', 'FS', 'UTF8ToString']" --memory-init-file 0 --pre-js  wrap/pre.js --post-js wrap/post.js
export EMCC_DEBUG=""
# node --eval $'const m=require("./dist/mysqrt");m().then(()=>{m.array_demo();});'
node h.js
