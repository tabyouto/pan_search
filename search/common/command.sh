#!/bin/bash

echo "execute fetch html content"

sql_result=`node task.js`

echo "$sql_result"

if [[ $sql_result =~ "success" ]]

then echo 'execute success'

else echo 'execute fail please check your code again'

fi
