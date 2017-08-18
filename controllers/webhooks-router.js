"use strict";

const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const Utility = require('./utility');
const Reseller = require('./reseller');

/**
 * Callback URL as specified in `manifest.json`
 */
router.post('/callback', function(req, res) {
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

	let message = messages.join("\n");

	console.log('Messages: ', messages);

	// Evaluate event data, if it is a dashboard.update.card event, need to trigger the reseller-router
    /** Live example of dashboard.update.card event
    {
        "client_id": "465279841",
        "client_version": "1.0.1",
        "event": "dashboard.card.update",
        "timestamp": 1503012759,
        "data": {
            "user_id": "108919051",
            "site_id": "247763368794122525",
            "platform_app_id": "465279841",
            "platform_dashboard_card_id": "528166133822187070",
            "platform_dashboard_card_version": "1.0.1",
            "name": "devrel-interview",
            "language": "en"
        },
        "hmac": "57391a92b4a6e33ad91bb82df25f6dda865e247be9632c0555dadba4299a689d"
    }',
    **/

	if(req.body.data) {
		let data = JSON.parse(req.body.data);
		console.log('PARSED DATA: ', data);
		if('dashboard.card.update' === data.event) {
			let userId = data.user_id;
			let siteId = data.site_id;
			let cardId = data.platform_dashboard_card_id;
			let rUser = Reseller.getUser(function(err, data) {
				if(err) {
					console.error(err, data);
				} else {
					console.log(data);
					Card.update(data, token, userId, siteId, cardId, function(err, result) {
						if( err ) {
							console.error('Failed to update card with user data: ', err);
						} else {
							console.log('Card updated with user data!', data);
							res.status(200).send(message);
						}
					});
				}
			});
		}
	} else {
		res.status(200).send(message);
	}

});

/**
 * @type Express.Router
 */
module.exports = router;
