let needle = require('needle');
let wHasher = require('../utils/WeeblyHasher');

/**
 * Get live data from Weebly Cloud API for Reseller User provided.
 */
let Reseller = {};

// For retrieving the reseller user data
const apiBaseURI    = process.env.WEEBLY_CLOUD_API_BASE_URI;
const apiKey        = process.env.WEEBLY_CLOUD_API_KEY;
const apiSecret     = process.env.WEEBLY_CLOUD_API_SECRET;
const apiUser       = process.env.WEEBLY_CLOUD_API_USER_ID;

// GET user
Reseller.getUser = function (cb) {
	console.log('Inside Reseller.getUser()');
	let userUrl = 'user/' + apiUser;
	let url = apiBaseURI + userUrl;
	let hash = wHasher.buildRequestHash('GET', userUrl);

	let needleOpts = {
		json: true,
		headers: {
			'X-Public-Key': apiKey,
			'X-Signed-Request-Hash': hash,
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
	};

	needle('get', url, {}, needleOpts)
		.then(function(resp) {
			console.log('RESPONSE: ', resp);
			cb(null, resp);
		})
		.catch(function(err) {
			console.error(err);
			cb(err)
		});
};

// PATCH user
Reseller.updateUser = function (data, cb) {
	console.log('Inside Reseller.updateUser()');
	let userUrl = 'user/' + apiUser;
	let url = apiBaseURI + userUrl;
	let hash = wHasher.buildRequestHash('GET', userUrl, data);

	let needleOpts = {
		json: true,
		headers: {
			'X-Public-Key': apiKey,
			'X-Signed-Request-Hash': hash,
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
	};

	needle('patch', url, {}, needleOpts)
		.then(function(resp) {
			console.log('RESPONSE: ', resp);
			cb(null, resp);
		})
		.catch(function(err) {
			console.error(err);
			cb(err)
		});
};

// GET user login link
Reseller.getUserLoginLink = function (cb) {
	console.log('Inside Reseller.getUserLoginLink()');
	let userUrl = 'user/' + apiUser + '/loginLink';
	let url = apiBaseURI + userUrl;
	let hash = wHasher.buildRequestHash('GET', userUrl);

	let needleOpts = {
		json: true,
		headers: {
			'X-Public-Key': apiKey,
			'X-Signed-Request-Hash': hash,
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
	};

	needle('get', url, {}, needleOpts)
		.then(function(resp) {
			console.log('RESPONSE: ', resp);
			cb(null, resp);
		})
		.catch(function(err) {
			console.error(err);
			cb(err)
		});
};

// GET siteList
Reseller.getSites = function (cb) {
	console.log('Inside Reseller.getSites()');
	let sitesUrl = 'user/' + apiUser + '/site';
	let url = apiBaseURI + sitesUrl;
	let hash = wHasher.buildRequestHash('GET', sitesUrl);

	let needleOpts = {
		json: true,
		headers: {
			'X-Public-Key': apiKey,
			'X-Signed-Request-Hash': hash,
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
	};

	needle('get', url, {}, needleOpts)
		.then(function(resp) {
			console.log('RESPONSE: ', resp);
			cb(null, resp);
		})
		.catch(function(err) {
			console.error(err);
			cb(err)
		});
};

/**
 * @type Express.Router
 */
module.exports = Reseller;
