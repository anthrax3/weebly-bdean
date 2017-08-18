var express = require('express');
var router = express.Router();
let Reseller = require('../controllers/reseller');
// For retrieving the reseller user data
const apiBaseURI    = process.env.WEEBLY_CLOUD_API_BASE_URI;
const apiKey        = process.env.WEEBLY_CLOUD_API_KEY;
const apiSecret     = process.env.WEEBLY_CLOUD_API_SECRET;
const apiUser       = process.env.WEEBLY_CLOUD_API_USER_ID;


/* GET home page. */
router.get('/', function(req, res, next) {
    /*
    Needle is not available within Resller this way....something is broken here...no time to figure out what
    Reseller.getUser(function(err, data) {
        if(err) {
            console.error(err, data);
        } else {
            //console.log('User Data: ', user);
            res.render('reseller', {
                title: 'Manage Reseller User',
                resellerId: '',
                resellerTestMode: data.test_mode,
                resellerEmail: data.email, 
                resellerLanguage: data.language 
            });
        }
    });
    */
    res.render('reseller', {
        title: 'Manage Reseller User'
    });
});

router.get('/user', function(req, res, next) {
});

module.exports = router;
