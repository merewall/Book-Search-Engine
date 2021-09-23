// BRING IN JSON WEB TOKEN MODULE
const jwt = require('jsonwebtoken');

// SET TOKEN SECRET AND EXPIRATION
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  // FUNCTION FOR OUR AUTHENTICATED ROUTES
  authMiddleware: function ({req}) {
    // ALLOWS TOKEN TO BE SENT VIA REQ.BODY, REQ.QUERY OR HEADERS
    let token = req.body.token || req.query.token || req.headers.authorization;

    // ["Bearer", "<tokenvalue>"]
    // SPLIT TOKEN INTO AN ARRAY AND RETURN ACTUAL TOKEN
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    // IF NO TOKEN, SEND ERROR STATUS AND MESSAGE
    if (!token) {
      // return res.status(400).json({ message: 'You have no token!' });
      return req;
    }

    // IF TOKEN IS VERIFIED, ADD THE DECODED USER'S DATA TO THE REQUEST SO IT CAN BE ACCESSED BY THE RESOLVER, OTHERWISE SEND ERROR MESSAGE
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
      // return res.status(400).json({ message: 'invalid token!' });
    }

    // SEND TO NEXT ENDPOINT
    // next();
    return req;
  },
  // PASSING THE USER'S USERNAME, EMAIL AND ID FROM THE LOGIN RESOLVER TO THE SIGNTOKEN FUNCTION
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    // USE JSON WEB TOKEN PACKAGE TO "HASH" USER INFO AND GIVE EXPIRATION OF TOKEN
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
