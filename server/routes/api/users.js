const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

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
      let user = await User.findOne({ email });

      if (user) {
        res.status(400).json({ errors: [{ msg: "El usuario ya existe" }] });
      }
 
      user = new User({
        email,
        password,
      });

      //encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
          estado: 'Developer'
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {expiresIn: 360000},
        (err, token) => {
          if (err) throw err;
          res.json({token});
        }
        );

    
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
