const notFound = (req, res) =>
  res.status(404).send("A página pesquisada não existe!!!");

module.exports = notFound;
