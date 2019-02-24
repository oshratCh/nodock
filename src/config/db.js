module.exports = {
  dbConnection: {
    host: "mysql",
    user: "default_user",
    password: "secret"
  },
  dbSchema: {
    DATABASE_NAME: "default_database",
    ACCOUNTS_TABLE: "accounts_table",
    ADMINS_TABLE: "admins_table",
    LIMITS_TABLE: "limits_table",
    BUILD_TABLE: "build_table"
  },
  pagination: {
    hitsPerPage: 3
  }
};
