import verify from 'jsonwebtoken';
import { UNAUTHORIZED } from '../constants/httpStatus.js';

export default (req, res, next) => {
  const token = req.headers.access_token;
  if (!token) return res.status(UNAUTHORIZED).send();

  try {
    console.log("This is the token: " + token);
    const decoded = verify(token, 'SomeRandomText');
    console.log("This is the decoded: " + decoded);
    req.user = decoded;
    console.log("This is the req.user:" + req.user);
  } catch (error) {
    res.status(UNAUTHORIZED).send();
  }

  return next();
};