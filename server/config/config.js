const fs = require('fs');//для ssl сертификата. Подсоединяется в продакшене
require('dotenv').config();

const developmentpassword = process.env.DB_PASSWORD.toString();
const testpassword = process.env.CI_DB_PASSWORD.toString();
const productionpassword = process.env.PROD_DB_PASSWORD.toString();
module.exports = {
  development: {
    username: process.env.DB_USER,
    password: developmentpassword,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port:process.env.DB_PORT,
    dialect: 'postgres'
  },
  test: {
    username: process.env.CI_DB_USERNAME,
    password: testpassword,
    database: process.env.CI_DB_NAME,
    host: process.env.CI_DB_HOST,
    port:process.env.CI_DB_PORT,
    dialect: 'postgres'
  },
  production: {
    username: process.env.PROD_DB_USERNAME,
    password: productionpassword,
    database: process.env.PROD_DB_NAME,
    host: process.env.PROD_DB_HOST,
    port:process.env.PROD_DB_PORT,
    dialect: 'postgres'
  }
}