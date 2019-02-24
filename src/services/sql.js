var mysql = require('mysql');
const { Observable } = require('rxjs');

require('rxjs/add/observable/from');
require('rxjs/add/observable/forkJoin');

const { map } = require('rxjs/operators');

const dbConfig  = require('../config/db');

const DATABASE_NAME = dbConfig.dbSchema.DATABASE_NAME;
const ACCOUNTS_TABLE = dbConfig.dbSchema.ACCOUNTS_TABLE;
const ADMINS_TABLE = dbConfig.dbSchema.ADMINS_TABLE;
const LIMITS_TABLE = dbConfig.dbSchema.LIMITS_TABLE;
const BUILD_TABLE = dbConfig.dbSchema.BUILD_TABLE;
const HITS_PER_PAGE = dbConfig.pagination.hitsPerPage;


const connection = mysql.createConnection({
    host     : dbConfig.dbConnection.host,
    user     : dbConfig.dbConnection.user,
    password : dbConfig.dbConnection.password,
    //database: DATABASE_NAME
  });

function connect() {
   return new Promise((resolve, reject) => {
    connection.connect(function(err) {
        console.log('connection.connect');
        if (err) {
            console.log(err);
            reject(err)
        } else {
            console.log('Successfully', connection.threadId);
            connection.changeUser({
                database : DATABASE_NAME
            })
            resolve(connection.threadId);
        }
    });
   }); 
}

function disconnect () {
    return new Promise((resolve, reject) => {
        connection.end(function(err) {
            console.log('connection.end');
            if (err) {
                console.log(err);
                reject(err)
            } else {
                console.log('Successfully');
                resolve();
            }
        });
       });
}


function loadAllWithJoinQueyOption(joinStr, page) {
    const limitFrom = page * HITS_PER_PAGE, limitTo = (page +1) * HITS_PER_PAGE;    
    return Observable.create(observer => {
    var options = {
        sql: 'SELECT SQL_CALC_FOUND_ROWS * FROM ' + ACCOUNTS_TABLE + joinStr + ' ORDER BY ID LIMIT '+ limitFrom + ',' + limitTo};
    connection.query(
        options, function callback (error, results, fields) {           
            if (error) {
                observer.error(error);
            } else {
                observer.next(results);
                observer.complete()
            }
          });

        return () => {
            observer.complete()
        };
    });
}


async function init() {
    await connection.query('DROP DATABASE IF EXISTS `' + DATABASE_NAME + '`');
    await connection.query('CREATE DATABASE `' + DATABASE_NAME + '`');
}


function runQueryWithParams(query, params) {    
    return Observable.create(observer => {
        connection.query(
            query, 
            params, 
            function callback (error, results, fields) {                            
            if (error) {
                observer.error(error);
            } else {                
                observer.next(results);
                observer.complete()
            }
          });

        return () => {
            observer.complete()
        };
    });
}

function runQuery(queryString) {
    return connection.query(queryString);
}

function getTotalResults() {
    return runQueryWithParams('SELECT FOUND_ROWS()').pipe(map(result => result[0]["FOUND_ROWS()"]));
}

module.exports = {
    disconnect,
    connect,
    init,
    loadAllWithJoinQueyOption,
    runQueryWithParams,
    runQuery,
    getTotalResults
}