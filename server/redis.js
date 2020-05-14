const redis = require('redis')

const REDIS_PORT = process.env.PORT || 6379;

const myFirstQueue = new Bull('my-first-queue');

