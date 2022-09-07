#!/bin/bash

set -eou pipefail

echo STARTING DATABASE IMPORT

mongoimport --host ${HOST} --db ${DATABASE} --collection users --type json --file /mnt/data/users.json --jsonArray
mongoimport --host ${HOST} --db ${DATABASE} --collection chores --type json --file /mnt/data/chores.json --jsonArray
mongoimport --host ${HOST} --db ${DATABASE} --collection lands --type json --file /mnt/data/lands.json --jsonArray

echo FINISHED DATABASE IMPORT