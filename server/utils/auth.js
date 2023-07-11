// Reference Module 21 -> Activity 23 -> server -> utils -> auth.js
// use this to decode a token and get the user's information out of it

const jwt = require('jsonwebtoken');

const secret = 'mysecretssshhhhhhh';
const expiration = '2h';

module.exports = {
    signToken: function ({ email, name, _id }) {
        const payload = { email, name, _id };
        return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    },
    authMiddleware: function ({ req }) {

        let token = req.body.token || req.query.token || req.headers.authorization;
        if (req.headers.authorization) {
          token = token.split(' ').pop().trim();
        }
      
        if (!token) {
          return req;
        }
      
        console.log('***USER IN AUTH BEFORE DECODING***: ', req.user); 
      
        try {
          const { data } = jwt.verify(token, process.env.JWT_SECRET, { maxAge: expiration });
          req.user = data;
        } catch {
          console.log('Invalid token');
        }
      
        console.log('***USER IN AUTH AFTER DECODING***: ', req.user); 
      
        return { req, token };
      }
      

};

