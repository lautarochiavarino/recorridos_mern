const express = require('express');
const router = express.Router();

//  @route      GET api/place
//  @desc       Test Route
//  @access     Public
router.get('/', (req,res) => res.send('Place route'));

module.exports = router;
