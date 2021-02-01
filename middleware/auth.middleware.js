// Middleware is a simple function that allows to catch data and to create (or make) the logic that we are writing
const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
  // 'OPTIONS' is a special method that is available in REST API. It checks if the server is available or not
  if (req.method === 'OPTIONS') {
    return next()
  }

  // here we gonna execute the code from GET or POST
  try {
    // 'authorization' is a String from the headers that w gonna send from the frontend side - "Bearer TOKEN"
    const token = req.headers.authorization.split(' ')[1] 

    if (!token) {
      // 401 - no authorization
      return res.status(401).json({ message: 'Unauthorized' })
    }

    // the method "verify" decodes our token, the 2nd parameter will be the secret
    const decoded = jwt.verify(token, config.get('jwtSecret'))
    // after we receive de decoded token, we put it into the object 'req' inside the filed 'user'
    req.user = decoded
    next()

  } catch (e) {
    res.status(401).json({ message: 'Unauthorized' })
  }
}