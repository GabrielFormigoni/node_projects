const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  const { name } = req.body;
  if (name) {
    res.status(200).send(`Bem-vindo ${name}.`);
  } else {
    res.status(401).send("Por favor, informe seu nome.");
  }
});

module.exports = router;
