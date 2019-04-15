var router = require('express').Router();
console.log('index-routes called');
router.use('/api', require('./api'));

module.exports = router;
