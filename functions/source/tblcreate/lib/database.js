/* eslint-disable func-names, wrap-iife, space-before-function-paren */
//const mysql = require('mysql');
const Redshift = require('node-redshift');

const Database = (() => {
  // eslint-disable-next-line no-shadow
  /**
   * @class Database
   * @constructor
   */
  const database = function(config) {
    this.client = new Redshift(config);
  };

  database.prototype.query = function(sql, args) {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line consistent-return
      this.client.query(sql, args, (err, rows) => {
        if (err) {
          return reject(err);
        }
        resolve(rows);
      });
    });
  };
  return database;
})();

module.exports = Database;
