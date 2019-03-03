#!/bin/bash
git add .
git commit -m "$@"
git status
echo -e "\e[1;31mPush in 10 seconds.\e[m"
sleep 10
git push -u https://github.com/shir0tetsuo/psicarto-project.git master
