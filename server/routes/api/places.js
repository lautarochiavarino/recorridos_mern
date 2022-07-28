const express = require('express');
const router = express.Router();

//  @route      GET api/place
//  @desc       Get 
//  @access     Public
router.get('/', (req,res) => res.send('Place route'));

module.exports = router;
