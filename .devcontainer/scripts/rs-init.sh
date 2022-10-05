#!/bin/bash
mongosh --host mongodb:27017 <<EOF
var config = {
    "_id": "dbrs",
    "version": 1,
    "members": [
        {
            "_id": 1,
            "host": "mongodb:27017",
            "priority": 1
        },
    ]
};
rs.initiate(config, { force: true });

use orsive;
db.createCollection("init");

use scheduler;
db.createCollection("init");
EOF
