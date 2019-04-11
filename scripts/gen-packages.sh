#! /bin/sh
echo `pwd`
cd packages

for dir in `ls`;do
  cd $dir
  echo `ls`
  #rm -rf ./*
  touch index.js
  touch readme.md
  mkdir -p docs
  mkdir -p test
  mkdir -p src
  mkdir -p src/templates
  #npm init
  cd ../
done

