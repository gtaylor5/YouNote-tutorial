const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  let publicURLS = [
    {url: '/api/auth/', method: 'POST'}
  ]

  let isPublic = false;

  for(var i = 0; i < publicURLS.length; i++) {
    const {url, method} = publicURLS[i];
    if(req.url.includes(url) && req.method === method){
      isPublic = true;
      break;
    }
  }

  if(isPublic) {
    next();
    return;
  }

  const token = req.header('x-auth-token');
  if(!token) {
    res.status(401).json({ msg: "Invalid token. Access Denied"});
    return;
  }

  try {
    const decoded = jwt.verify(JSON.parse(token), 'secret');
    req.username = decoded;
    next();
  } catch (exception) {
    res.status(400).json({msg: 'Token is not valid.'});
  }
}

module.exports = auth;