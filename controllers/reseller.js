"use strict";

const crypto = require('crypto');
const request = require('request');
const Utility = require('./utility');

/**
 * Get live data from Weebly Cloud API for Reseller User provided.
 */
let Reseller = {};

// For retrieving the reseller user data
const resellerAPI            = process.env.WEEBLY_CLOUD_API_BASE_URI;
const resellerClientID       = process.env.WEEBLY_CLOUD_API_KEY;
const resellerClientSecret   = process.env.WEEBLY_CLOUD_API_SECRET;
const resellerUserId         = process.env.WEEBLY_CLOUD_API_USER_ID;

Reseller.getUser = function (cb) {
	// Generate hash for the API
    let hash = Utility.generateHmac('GET' + '\n' + 'user/' + resellerUserId + '\n', resellerClientSecret)
    // Configure request object
    let reqOpts = {
        method: 'GET',
        url: resellerAPI + 'user/' + resellerUserId,
        headers: {
            X-Public-Key: this.resellerClientId,
            X-Signed-Request-Hash: hash,
            Content-Type: 'application/json',
            Accepts: 'application/json'
        },
    };

    // GET reseller user
    request(options, function(err, response, body) {
        if(err) {
            console.error(err, data);
            cb(err, data);
        } else {
            console.log('getUser response body: ', body);
            cb(null, body);
        }
    });
};

/**
 * @type Express.Router
 */
module.exports = Reseller;
