//JSON Web Token configuration
module.exports.token = {
  secret_key: 'pYEPPKPncISGw34D',
  expire_value: 7,
  expire_type: 'days'
}
//Database configuration
module.exports.database = {
  dev: {
    "dialect": "sqlite",
    "storage": "./database.sqlite"
  },
  test: {
    "dialect": "sqlite",
    "storage": ":memory:"
  },
  production: {
    "dialect": "postgresql",
    "username": "root",
    "password": null,
    "database": "dbName",
    "host": "127.0.0.1"
  }
};
