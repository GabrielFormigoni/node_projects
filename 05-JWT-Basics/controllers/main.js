const jwt = require("jsonwebtoken");
const { BadRequestError } = require("../errors");

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new BadRequestError("Por favor, informe o usuário e senha");
  }

  const id = new Date().getDate();

  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  res.status(200).send({ msg: "Usuário criado", token: token });
};

const dashboard = (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100) + 1;
  res.status(200).send({
    msg: `Olá, ${req.user.username}.`,
    secret: `Acesso autorizado, seu número da sorte é: ${luckyNumber}`,
  });
};

module.exports = {
  login,
  dashboard,
};
