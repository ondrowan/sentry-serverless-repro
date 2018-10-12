const express = require('express');
const app = express();
const Sentry = require('@sentry/node') ;
const awsServerlessExpress = require('aws-serverless-express')

Sentry.init({
    dsn: process.env.SENTRY_DSN,
    debug: true
});

app.use(Sentry.Handlers.requestHandler());

app.get('/', function mainHandler(req, res) {
    throw new Error();
});

app.use(Sentry.Handlers.errorHandler());

app.use(function onError(err, req, res, next) {
    res.statusCode = 500;
    res.end(res.sentry + '\n');
});

const server = awsServerlessExpress.createServer(app);

module.exports.handler = (event, context) => awsServerlessExpress.proxy(server, event, context);

// server.listen(3000)