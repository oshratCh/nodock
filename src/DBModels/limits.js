const sqlMagager = require('../services/sql')
const dbConfig  = require('../config/db');
const Types = require('../shared/types');

const DATABASE_NAME = dbConfig.dbSchema.DATABASE_NAME;
const LIMITS_TABLE = dbConfig.dbSchema.LIMITS_TABLE;

exports.init = async () => {
    await sqlMagager.runQuery('DROP TABLE IF EXISTS `' + DATABASE_NAME + '`.`' + LIMITS_TABLE + '`;');
    await sqlMagager.runQuery('CREATE TABLE `' + DATABASE_NAME + '`.`' + LIMITS_TABLE + '` ('+
    'fieldZ varchar(10) DEFAULT NULL,' +
    'fieldY bit DEFAULT NULL,' +
    'fieldX int DEFAULT NULL,' +
    'accountID varchar(45) NOT NULL,' +
    'FOREIGN KEY (`accountID`) REFERENCES `' + dbConfig.dbSchema.ACCOUNTS_TABLE + '` (`ID`) ON DELETE CASCADE' +
    ')');
}

exports.getJoinAccountQuery = () => {
    return ' LEFT JOIN ' + LIMITS_TABLE + 
    ' ON '+ dbConfig.dbSchema.ACCOUNTS_TABLE +'.ID=' + LIMITS_TABLE + '.accountID';
}


exports.isValid = account => {
    const { fieldZ, fieldY, fieldX } = account.limits || {};
    return  ( typeof fieldZ == Types.string && fieldZ.length <= 10 ) ||
            ( typeof fieldY == Types.boolean ) || 
            ( typeof fieldX == Types.number ) ||
            fieldZ == null && fieldY == null && fieldX == null
}

exports.save = (account) => {
    const limitsMask = account.limits;
    limitsMask.accountID = account._id;
    return sqlMagager.runQueryWithParams(`INSERT INTO ${LIMITS_TABLE} SET ?`, limitsMask)
}