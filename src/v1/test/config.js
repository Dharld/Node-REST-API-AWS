// Set env variables for testing
process.env.NODE_ENV = 'test';
process.env.MONGO_URL = 'mongodb://127.0.0.1:27017/rest-api-nodejs-mongodb';
process.env.JWT_SECRET = 'secret';
process.env.JWT_EXPIRATION = '1d';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../app');
const should = chai.should();
chai.use(chaiHttp);

module.exports = {
    chai: chai,
    should: should,
    server: server,
};

