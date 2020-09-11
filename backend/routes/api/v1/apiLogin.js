const express = require('express');
const router = express.Router();

router.post('/', function(req, res, next) {

    // spoof valid login
  res.json({authenticated: true});
  
});

module.exports = router;