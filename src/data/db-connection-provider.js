const mysql = require('mysql2/promise');
const config = require('../config/config');

const pool = createConnectionPool();

const dbConnectionProvider = {};

dbConnectionProvider.execute = async function(queryFunction)
{
  const connection = await pool.getConnection();
  if (!connection)
  {
    throw new Error('Failed to get DB connection');
  }

  try
  {
    return await queryFunction(connection);
  }
  finally
  {
    connection.release();
  }
};

function createConnectionPool()
{
  const poolOptions =
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectionLimit: config.dbConnectionPool,
    namedPlaceholders: true
  };

  if (config.dbTimezone)
  {
    poolOptions.timezone = config.dbTimezone;
  }

  return mysql.createPool(poolOptions);
}

module.exports = dbConnectionProvider;
