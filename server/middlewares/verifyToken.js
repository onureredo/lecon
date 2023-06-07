import jwt from 'jsonwebtoken';
import asyncHandler from '../utils/asynchHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';

const verifyToken = asyncHandler(async (req, res, next) => {
  /*
    Check if token is present in the request:
      - If not present, return an error
      - If present:
        - Verify the token
          - If the token is invalid, return an error
          - If the token is valid:
            - Create a `uid` property in the request object and set it to the decoded user ID
            - Call the `next` function to pass control to the next middleware
  */

  const authHeader = req.headers.authorization;
  if (!authHeader) throw new ErrorResponse('Please login', 401);

  // Check if the 'Bearer ' prefix is present
  if (!authHeader.startsWith('Bearer '))
    throw new ErrorResponse('Malformed token', 401);

  // Parse the token
  const token = authHeader.substring(7, authHeader.length);

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.uid = decoded.uid;
  next();
});

export default verifyToken;
