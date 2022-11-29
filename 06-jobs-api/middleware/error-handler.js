const { CustomAPIError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const errorHandlerMiddleware = (err, req, res, next) => {
  const customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg:
      err.message || "Algo deu errado, por favor tente novamente mais tarde.",
  };

  if (err.name === "ValidationError") {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(", ");
    customError.statusCode = 400;
  }

  if (err.code && err.code == 11000) {
    customError.statusCode = 400;
    customError.msg = `Duplicata detectada no campo ${Object.keys(
      err.keyValue
    )}, por favor, insira outro valor.`;
  }

  if (err.name === "CastError") {
    customError.msg = `o id: ${err.value} não possui um item correspondente.`;
    customError.statusCode = 404;
  }

  return res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHandlerMiddleware;
