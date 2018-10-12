# Reproduction of @sentry/node not working with serverless

## Setup

Install dependencies with `yarn`.


## Scenarios

### Run application with serverless-offline

Run `SENTRY_DSN=... yarn serverless offline start`. Go to `localhost:3000` in
your browser. No error is sent to Sentry.


### Run application with express

Uncomment last line in `handler.js`. Run `SENTRY_DSN=... node handler.js`. Go
to `localhost:3000` in your browser. Error is successfully sent to Sentry.


### Deploy application to AWS Lambda

Run `yarn serverless deploy` (check [docs for details](https://serverless.com/framework/docs/providers/aws/guide/quick-start/)).
Set `SENTRY_DSN` env variable in created function. Go to URL of given function.
No error is sent to Sentry.


### Replace event and error handlers with captureException

If you replace `requestHandler` and `errorHandler` with `Sentry.captureException(err)`
in `onError` middleware, Express and serverless-offline scenarios send errors
successfully, however Lambda still doesn't send anything (I suspect it might be
cased by callbacks not being waited on, although documentation states otherwise).