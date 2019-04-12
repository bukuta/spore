#! /bin/sh
echo `pwd`
cd packages

dirs=(
  #api-java
  api-javascript
  #api-python
  controller-java
  #controller-node
  #controller-python
  form-vue
  #form-react
  model-java
  #model-node
  #model-python
  model-sql
  model-vue
  page-vue
  server-nginx
)

for dd in ${dirs[@]};do
  echo $dd
done

exit

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

