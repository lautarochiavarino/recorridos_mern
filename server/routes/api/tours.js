const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Tour = require("../../models/Tour");

//  @route      GET api/tour
//  @desc       Get Tour
//  @access     Private
router.get('/', auth, async (req,res) => {
    try {
        const tour = await
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
