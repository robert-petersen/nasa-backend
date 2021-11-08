require("dotenv").config();

const DB = process.env.DB;

module.exports = {

  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './data/nasa.db3'
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run("PRAGMA foreign_keys = ON", done);
      },
    },
    migrations: {
      directory: "./data/migrations",
    },
    seeds: { 
      directory: "./data/seeds" 
    }
  },

  production: {
    client: 'pg',
    connection: DB,
    migrations: {
      directory: "./data/migrations",
    },
    seeds: { 
      directory: "./data/seeds" 
    }
  }

};
