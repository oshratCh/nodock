const sqlMagager = require('../services/sql')
const dbConfig  = require('../config/db');
const Types = require('../shared/types');

const DATABASE_NAME = dbConfig.dbSchema.DATABASE_NAME;
const BUILD_TABLE = dbConfig.dbSchema.BUILD_TABLE;

exports.init = async () => {
    await sqlMagager.runQuery('DROP TABLE IF EXISTS `' + DATABASE_NAME + '`.`' + BUILD_TABLE + '`;');
    await sqlMagager.runQuery('CREATE TABLE `' + DATABASE_NAME + '`.`' + BUILD_TABLE + '` ('+
    'parallel int DEFAULT NULL,' +
    'nodes int DEFAULT NULL,' +
    'accountID varchar(45) NOT NULL,' +
    'FOREIGN KEY (`accountID`) REFERENCES `' + dbConfig.dbSchema.ACCOUNTS_TABLE + '` (`ID`) ON DELETE CASCADE' +
    ')');
}

exports.getJoinAccountQuery = () => {
    return ' LEFT JOIN ' + BUILD_TABLE + 
    ' ON '+ dbConfig.dbSchema.ACCOUNTS_TABLE +'.ID=' + BUILD_TABLE + '.accountID';
}

exports.isValid = account => {
    const { parallel, nodes } = account.build || {};
    return  ( parallel == null || typeof parallel == Types.number ) &&
            ( nodes == null || typeof nodes == Types.number )
}

exports.save = (account) => {
    const buildMask = account.build;
    buildMask.accountID = account._id;
    return sqlMagager.runQueryWithParams(`INSERT INTO ${BUILD_TABLE} SET ?`, buildMask)
}