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
    const tours = await Tour.find();
    res.json(tours);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//  @route      GET api/tour/:id
//  @desc       Get Tour by ID
//  @access     Private
router.get("/tour/:id", auth, async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    
    if (!tour) return res.status(404).json({msg: 'No existe el Tour'});

    res.json(tour);
  } catch (err) {
    console.error(err.message);
    if(err.kind == 'ObjectId'){
      return res.status(404).json({msg: 'No existe el Tour'});
    }
    res.status(500).send("Server Error");
  }
});

//  @route      Delete api/tour/:id
//  @desc       Delete a Tour by ID
//  @access     Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    await tour.remove();
    res.json({msg: 'Tour eliminado'});
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
      check("places", "Debe asignar una dirección").not().isEmpty(),
      check("activities", "Debe agregar una actividad").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // const { title, date, places, activities } = req.body;

    // const tourFields = {};

    // if (title) tourFields.title = title;
    // if (date) tourFields.date = date;
    // if (places){
    //   //tourFields.places = places.split(',').map(place => place.trim());
    //   tourFields.places = places;
    // } 
    // if (activities){
    //   tourFields.activities = activities;
    // } 
    // console.log(tourFields.places);

    // console.log(tourFields.activities);

    const tourFields = req.body;
   
    try {
      //update
      let tour = await Tour.findById( tourFields.id );
      console.log('mytour',tour);
      if (tour) {
        tour = await Tour.findOneAndUpdate(
          { _id: tourFields.id },
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
