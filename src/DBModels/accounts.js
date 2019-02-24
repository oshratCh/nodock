const dbConfig = require("../config/db");
const Types = require("../shared/types");
const sqlMagager = require("../services/sql");

exports.sqlMagager = sqlMagager;
const DATABASE_NAME = dbConfig.dbSchema.DATABASE_NAME;
const ACCOUNTS_TABLE = dbConfig.dbSchema.ACCOUNTS_TABLE;

exports.init = async () => {
  await sqlMagager.runQuery('DROP TABLE IF EXISTS `' + DATABASE_NAME + '`.`' + ACCOUNTS_TABLE + '`;');
  await sqlMagager.runQuery("CREATE TABLE `" +
    DATABASE_NAME +
    "`.`" +
    ACCOUNTS_TABLE +
    "` (" +
    "ID varchar(45) NOT NULL PRIMARY KEY," +
    "name varchar(45) DEFAULT NULL," +
    "provider varchar(45) DEFAULT NULL," +
    "privateAccountOwner varchar(45) DEFAULT NULL," +
    "canUsePrivateRepos bit DEFAULT NULL" +
    ")");
};

exports.isValid = account => {
  const { _id, name, provider, privateAccountOwner, canUsePrivateRepos } =
    account || {};
  return  ( _id != null && typeof _id == Types.string && _id.length <= 45 &&
    (typeof name == Types.undefined || typeof name == Types.string && name.length <= 45) &&
    (typeof provider == Types.undefined || typeof provider == Types.string && provider.length <= 45) &&
    (typeof privateAccountOwner == Types.undefined || typeof privateAccountOwner == Types.string && privateAccountOwner.length <= 45) &&
    (typeof canUsePrivateRepos == Types.undefined || typeof canUsePrivateRepos == Types.boolean))
};

exports.save = account => {
  const maskedAccput = (({
    _id,
    name,
    provider,
    privateAccountOwner,
    canUsePrivateRepos
  }) => ({ ID: _id, name, provider, privateAccountOwner, canUsePrivateRepos }))(
    account
  );
  return sqlMagager.runQueryWithParams(
    `INSERT INTO ${ACCOUNTS_TABLE} SET ?`,
    maskedAccput
  );
};
