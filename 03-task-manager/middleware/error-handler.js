const { CustomAPIError } = require("../error/customErrorHandler");

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  return res.status(500).json({
    msg: "Ocorreu algum problema. Por favor, tente novamente mais tarde!!!",
  });
};

module.exports = errorHandler;
