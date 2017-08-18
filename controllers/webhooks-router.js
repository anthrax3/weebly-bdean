"use strict";

const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const Utility = require('./utility');
const Reseller = require('./reseller');
const Card = require('./card');

/**
 * Callback URL as specified in `manifest.json`
 */
router.post('/callback', function(req, res) {
	//console.log(`\nreq.app.token: ${req.app.token}\n`);
	let comparisonObject = {
		'client_id': req.body.client_id,
		'client_version': req.body.client_version,
		'event': req.body.event,
		'timestamp': req.body.timestamp,
		'data': req.body.data
	};

	let comparisonString = JSON.stringify(comparisonObject);

	let messages = [];

	messages.push("\n");

    // validate the hmac to see if its correct
	if (!Utility.validateHmac(req.body.hmac, comparisonString, req.app.secretKey)) {
		messages.push(`A new webhook was received, but it's calculated hmac didn't match what was passed.`);
		messages.push(`Expected ${req.body.hmac}`);
		messages.push(`Calculated ${Utility.generateHmac(comparisonString)}`);
	} else {
		messages.push('A new webhook was recieved:');
	}

	messages.push(`Headers: ${JSON.stringify(req.headers, null, 2)}`);
	messages.push(`Data: ${JSON.stringify(req.body, null, 2)}`);

	messages.push("\n");

	if('dashboard.update.card' === req.body.event) {
		messages.push(`\nReceived update dashboard card event, ${req.body.data}\n`);
	}

	let message = messages.join("\n");

	console.log('Messages: ', messages);
	res.status(200).send(message);

});

/**
 * @type Express.Router
 */
module.exports = router;
