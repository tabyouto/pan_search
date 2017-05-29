'use strict';

let configInfo = require('../config');
var mysql = require('mysql');
var pool = mysql.createPool(configInfo);


var sqlAction = {
    query: function (sql, x, callback) {
        pool.getConnection(function (err, conn) {
            if (err) {
                callback(err, null, null);
            } else {
                conn.query(sql, x, function (qerr, vals, fields) {
                    //释放连接
                    conn.release();
                    //事件驱动回调
                    var _res = JSON.parse(JSON.stringify(vals));
                    console.log(sql,x)
                    callback(qerr, _res, fields);
                });
            }
        })
    },
    insert: function (sql, x, callback) {
        pool.getConnection(function (err, conn) {
            if (err) {
                callback(err, null, null);
            } else {
                conn.query(sql, x, function (qerr, vals, fields) {
                    conn.release();
                    var _res = JSON.parse(JSON.stringify(vals));
                    callback(qerr, _res, fields);
                });
            }
        })
    }
};

module.exports = sqlAction;

