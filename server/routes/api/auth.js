const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");
const User = require('../../models/User');

// const cors = require('cors');
// const corsOptions ={
//     origin:'http://localhost:3000', 
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200
// }
// app.use(cors(corsOptions));

//  @route      GET api/auth
//  @desc       Test Route
//  @access     Public
router.get('/', auth, async (req, res) => {
   try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
    
   } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
   }
});

//  @route      POST api/auth
//  @desc       Authenticate user & get token
//  @access     Public

router.post(
   "/",
   [
     check("email", "Por favor ingrese un E-mail valido").isEmail(),
     check(
       "password", "El password es requerido").exists(),
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
 
       if (!user) {
         return res.status(400).json({ errors: [{ msg: "Usuario o contraseña inválida" }] });
       }

       const isMatch = await bcrypt.compare(password, user.password);
  
       if (!isMatch) {
         return res.status(400).json({ errors: [{ msg: "Usuario o contraseña inválida" }] });
       }
       
 
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
