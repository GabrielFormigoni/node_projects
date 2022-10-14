let { people } = require("../data");

const getPeople = (req, res) => {
  res.status(200).json({ sucess: true, data: people });
};

const createPerson = (req, res) => {
  const { id, name } = req.body;

  if (!name) {
    res.status(400).json({ sucess: false, msg: "Por favor, informe um nome." });
  }
  res
    .status(201)
    .json({ sucess: true, data: [...people, { id: id, name: name }] });
};

const createPersonPostman = (req, res) => {
  console.log(req.body);
  const { id, name } = req.body;

  if (!name) {
    res.status(400).json({ sucess: false, msg: "Informe um nome!!!" });
  }

  res
    .status(200)
    .json({ sucess: true, data: [...people, { id: id, name: name }] });
};

const updatePerson = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const person = people.find((person) => person.id === Number(id));

  if (!person) {
    res.status(400).json({ sucess: false, msg: "Id não encontrado!!!" });
  }

  const newPeople = people.map((person) => {
    if (person.id === Number(id)) {
      person.name = name;
    }

    return person;
  });

  res.status(200).json({ sucess: true, data: newPeople });
};

const deletePerson = (req, res) => {
  const person = people.find((person) => person.id === Number(req.params.id));
  if (!person) {
    return res
      .status(404)
      .json({ success: false, msg: `no person with id ${req.params.id}` });
  }

  const newPeople = people.filter(
    (person) => person.id !== Number(req.params.id)
  );

  res.status(200).json({ sucess: true, data: newPeople });
};

module.exports = {
  getPeople,
  createPerson,
  createPersonPostman,
  updatePerson,
  deletePerson,
};
