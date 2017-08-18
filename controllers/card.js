"use strict";

const crypto = require('crypto');
const request = require('request');
const Utility = require('./utility');

/**
 * Weebly Card API Interface.
 */

const Card = {};

// Vars
const weeblyAPI  = process.env.MY_API_BASE_URI;
const clientId   = process.env.MY_CLIENT_ID;
const secretKey  = process.env.MY_CLIENT_SECRET;

Card.populateCard = function (userData, token, userId, siteId, cardId, cb) {

    let cardData = [
    ];

    let hash = Utility.generateHmac('PATCH' + '\n' + 'user/' + siteId + '\n' + JSON.stringify(cardData), secretKey)
    let payload = {
        card_id: cardId,
        data: [
        ]
    };
    let reqOpts = {
        method: 'PATCH',
        url: this.weeblyAPI + 'user/sites/' + siteId + '/cards/' + cardId,
        headers: {
            'X-Weebly-Access-Token': token,
            'Content-Type': 'application/json',
            'Accepts': 'application/json'
        },
    };

    // Execute the request to update the card
    request(reqOpts, function(err, response, body) {
        if(err) {
            console.error(err);
            cb(err, data);
        } else {
            console.log('populateCard response body: ', body);
            cb(null, body);
        }
    });

};

/**
 * @type Express.Router
 */
module.exports = Card;
