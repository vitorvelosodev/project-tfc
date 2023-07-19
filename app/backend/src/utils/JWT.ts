import jwt = require('jsonwebtoken');

const TOKEN_SECRET = process.env.JWT_SECRET || 'secretJWT';

const createToken = (payload: { email: string }): string =>
  jwt.sign(payload, TOKEN_SECRET);

const revalidateToken = (token: string) : boolean => {
  try {
    jwt.verify(token, TOKEN_SECRET);
    return true;
  } catch (err) {
    return false;
  }
};

export default {
  createToken,
  revalidateToken,
};
