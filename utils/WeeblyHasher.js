'use strict';

// Determine if crypto support is available
let crypto;
try {
    crypto = require('crypto');
} catch (err) {
    console.error('crypto support is unavailable');
}

const apiBaseURI    = process.env.WEEBLY_CLOUD_API_BASE_URI;
const apiKey        = process.env.WEEBLY_CLOUD_API_KEY;
const apiSecret     = process.env.WEEBLY_CLOUD_API_SECRET;
const apiUser       = process.env.WEEBLY_CLOUD_API_USER_ID;

let WeeblyHasher = {};

WeeblyHasher.generateHash = function (string) {
    /**
    console.log('BASE URI: ', apiBaseURI);
    console.log('KEY: ', apiKey);
    console.log('SECRET: ', apiSecret);
    console.log('USER ID: ', apiUser);
    console.log('generateHash String argument: ', string);
    **/

    // USING HMAC
	let hmac = crypto.createHmac('sha256', new Buffer(apiSecret, 'utf8'));
    hmac.update(string);
    let signature = hmac.digest('hex');

    let finalSig = new Buffer(signature).toString('base64');
    //console.log('SIGNATURE: ', finalSig);
    return finalSig;
};

WeeblyHasher.buildRequestHash = function (method, endpoint, data) {
    /**
    console.log('Inside constructRequestHash()');
    console.log('method: ', method);
    console.log('endpoint: ', endpoint);
    console.log('data: ', data);
    **/
    data = data || {};
    let errorMsgs = [];
    let validMethods = ['GET', 'PUT', 'POST', 'PATCH', 'DELETE'];
    // Make sure we have been provided a method argument
    if(!method || 'string' !== typeof method) {
        errorMsgs.push('Missing HTTP method being used for this requst');
    }
    // Make sure we have been provided an endpoint argument
    if(!endpoint || 'string' !== typeof endpoint) {
        errorMsgs.push('Missing required parameter endpoint while calling `constructRequestHash` method.');
    }
    // Ensure the method is a valid HTTP verb as supported by Weebly Cloud API

    if(!method || -1 === validMethods.indexOf(method)) {
        errorMsgs.push('Invalid HTTP method. Weebly Cloud API only accepts: GET, POST, PUT, PATCH, DELETE. Please see the docs here: http://cloud-developer.weebly.com/about-the-rest-apis.html');
    }

    // Construct the content string for generateHash(), only include data if present and associated with correct HTTP verb
    let content = `${method}\n${endpoint}\n${JSON.stringify(data)}`;

    //console.log('Content-Length: ', content.length);

    if(0 !== errorMsgs.length) console.log(errorMsgs);

    //console.log('RAW CONTENT: ', content);
    return this.generateHash(content);
};

module.exports = WeeblyHasher;
