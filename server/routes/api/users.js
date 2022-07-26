const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");

const User = require("../../models/User");

//  @route      POST api/users
//  @desc       Register Route
//  @access     Public

router.post(
  "/",
  [
    check("email", "Por favor ingrese un E-mail valido").isEmail(),
    check(
      "password",
      "El password debe contener 6 caracteres como mínimo"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      //user exist

      //get users

      //encrypt password

      res.send("User route");
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
