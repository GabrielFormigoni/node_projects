const auth = (req, res, next) => {
  const { user } = req.query;

  if (user === "Gab") {
    req.user = { name: "Gab", id: 1 };
    next();
  } else {
    res.status(401).send("<h1>Acesso não autorizado!!!</h1>");
  }
};

module.exports = auth;
