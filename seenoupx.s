#!/bin/bash
echo -e "\e[1;31mPROCESS, PROGRAM\e[m"
ps awuxx | grep node | grep -v "grep" | awk '{print $2, $12}'
read -p "Kill: " kpg
if [ -z $kpg ]; then
echo "Nothing was done."
exit 42
fi
kill $kpg
echo "Program $kpg was destroyed."
