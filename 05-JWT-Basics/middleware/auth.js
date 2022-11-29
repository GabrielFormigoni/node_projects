const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const authenticationMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Token não fornecido.");
  }

  const tokem = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(tokem, process.env.JWT_SECRET);

    const { id, username } = decoded;
    req.user = { id, username };
    next();
  } catch (error) {
    throw new UnauthenticatedError(
      "Usuário não possui autorização para acessar o dado."
    );
  }
};

module.exports = authenticationMiddleware;
