var Bags = require('../models/bags'),
    express   = require('express'),
    router    = express.Router();

/* GET bags listing. */
router.get('/', function(req, res, next) {
    res.render('bags', { title: 'All Bags' });
});

module.exports = router;
