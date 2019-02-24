const sqlMagager = require('../services/sql')
const dbConfig  = require('../config/db');
const Types = require('../shared/types');

const DATABASE_NAME = dbConfig.dbSchema.DATABASE_NAME;
const ADMINS_TABLE = dbConfig.dbSchema.ADMINS_TABLE;

exports.init = async () => {
    await sqlMagager.runQuery('DROP TABLE IF EXISTS `' + DATABASE_NAME + '`.`' + ADMINS_TABLE + '`;');
    await sqlMagager.runQuery('CREATE TABLE `' + DATABASE_NAME + '`.`' + ADMINS_TABLE + '` ('+
    'adminId varchar(45) NOT NULL,' +
    'accountID varchar(45) NOT NULL,' +
    'FOREIGN KEY (`accountID`) REFERENCES `' + dbConfig.dbSchema.ACCOUNTS_TABLE + '` (`ID`) ON DELETE CASCADE' +
    ')')
}

exports.getJoinAccountQuery = () => {
    return ' LEFT JOIN ' + ADMINS_TABLE + 
    ' ON '+ dbConfig.dbSchema.ACCOUNTS_TABLE +'.ID=' + ADMINS_TABLE + '.accountID';
}

exports.isValid = account => {
    const admins = account.admins;
    return  admins == null ||
            admins.find(item => typeof item != Types.string || item.length > 45) == null;
}

exports.save = (account) => {
    const buildMask = account.build;
    buildMask.accountID = account._id;
    return sqlMagager.runQueryWithParams(`INSERT INTO ${ADMINS_TABLE} SET ?`, buildMask)
}