import AppError from "../utils/appError.js";

const handleCastErrorDB = (error) =>
  new AppError(`Invalid ${error.path}: ${error.value}`, 400);

const handleDuplicateFieldsDB = (error) => {
  // find duplicate value name
  const value = error.errorResponse.errmsg
    .match(/name: "(.*?)"/)[0]
    .match(/"([^"]+)"/)[1];

  const message = `Duplicate field "${value}". Please use another value`;
  return new AppError(message, 400);
};

const handleValidationErrors = (error) => {
  const message = Object.values(error.errors)
    .map((el) => el.properties.message)
    .join('. ');
  return new AppError(message, 400);
};

const handleJsonWebTokenError = () =>
  new AppError('Invalid token. Please log in again!', 401);

const handleTokenExpiredError = () =>
  new AppError('Your token has expired. Please log in again!', 401);

const sendErrorDev = (error, res) => {
  res.status(error.statusCode).json({
    status: error.status,
    error: error,
    stack: error.stack,
    message: error.message,
  });
};

const sendErrorProd = (error, res) => {
  if (error.isOperational) {
    res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    });
  } else {
    console.error('💥 ERROR', error);
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong.',
    });
  }
};

export default (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || 'error';

  // eslint-disable-next-line no-undef
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(error, res);
  // eslint-disable-next-line no-undef
  } else if (process.env.NODE_ENV === 'production') {
    let productionError = { ...error };

    // cast error
    if (error.name === 'CastError')
      productionError = handleCastErrorDB(productionError);

    // duplicate key
    if (error.code === 11000) {
      productionError = handleDuplicateFieldsDB(productionError);
    }

    // validation error
    if (error.name === 'ValidationError') {
      productionError = handleValidationErrors(productionError);
    }

    // invalid JWT token
    if (error.name === 'JsonWebTokenError') {
      productionError = handleJsonWebTokenError();
    }

    // JWT Token Expired
    if (error.name === 'TokenExpiredError') {
      productionError = handleTokenExpiredError();
    }
    // sending production error
    sendErrorProd(productionError, res);
  }

  next();
};
