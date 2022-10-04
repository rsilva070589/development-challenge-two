#!/usr/bin/env sh

set -e

#yarn build
  
git init 

git config --global user.email "rsilva070589@gmail.com"
git config --global user.name "rsilva070589"


git add .
 

git commit -m "first commit"
git branch -M main
 
git remote add origin https://github.com/rsilva070589/development-challenge-two.git

git push -f origin main
 

 