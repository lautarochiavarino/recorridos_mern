const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const Tour = require("../../models/Tour");

//  @route      GET api/tour
//  @desc       Get All Tour
//  @access     Private
router.get("/", auth, async (req, res) => {
  try {
    const tour = await Tour.find();
    res.json(tour);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//  @route      POST api/tour
//  @desc       Create or Update Tour
//  @access     Private
router.post(
  "/",
  [
    auth,
    [
      check("title", "El título es obligatorio").not().isEmpty(),
      check("date", "La fecha es obligatoria").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, date } = req.body;

    const tourFields = {};

    if (title) tourFields.title = title;
    if (date) tourFields.date = date;

    try {
      //update
      let tour = await Tour.findOne({ title: tourFields.title });

      if (tour) {
        tour = await Tour.findOneAndUpdate(
          { title: tourFields.title },
          { $set: tourFields },
          { new: true }
        );
       return res.json(tour);

      }

      //create

      tour = new Tour(tourFields);
      await tour.save();
      res.json(tour);

    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
