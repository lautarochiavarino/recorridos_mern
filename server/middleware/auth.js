const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  //get token from header
  const token = req.header('x-auth-token');

   
  //check if not token
  console.log(req);
  if (!token) {
    return res.status(401).json({ msg: 'No Token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    console.log(decoded);
    req.user = decoded.user;
    next();
  } catch (err) {
   res.status(401).json({ msg: 'Invalid Token' });
  }
};
