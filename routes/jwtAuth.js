const jwt = require('jsonwebtoken');
const secretKey = require('../config/secretkey').secretKey;

async function verifyToken(req,res,next){
  // 인증 완료
  try {
    req.decoded = jwt.verify(req.cookies.accessToken, secretKey);
    return next();
  }
  // 인증 실패 
  catch(error) {
    res.clearCookie('accessToken',null,{
      maxAge:0
  });
  return res.redirect('/');
  }
}

module.exports={
    verifyToken:verifyToken
}