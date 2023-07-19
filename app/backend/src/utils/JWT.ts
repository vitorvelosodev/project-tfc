import jwt = require('jsonwebtoken');

const TOKEN_SECRET = process.env.JWT_SECRET || 'secretJWT';

const createToken = (payload: { email: string }): string =>
  jwt.sign(payload, TOKEN_SECRET);

export default {
  createToken,
};
