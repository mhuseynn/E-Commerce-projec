const CustomError = require('../errors');
const { isTokenValid } = require('../utils/jwt');

const authenticateUser = async (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization;
  
  if (authHeader && authHeader.startsWith('Bearer')) {
    token = authHeader.split(' ')[1];
  }
  else if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    throw new CustomError.UnauthenticatedError('Authentication failed');
  }
  try {
    const payload = isTokenValid(token);

    req.user = {
      userId: payload.user.userId,
      role: payload.user.role,
    };

    next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError('Authentication failed');
  }
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError(
        'You are not authorized to access this route'
      );
    }
    next();
  };
};

module.exports = { authenticateUser, authorizeRoles };
