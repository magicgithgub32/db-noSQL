const seed = {
  dogs: [
    {
      name: "Tambor",
      type: "Pug",
      age: 6,
      _petId: 1,
      _owner: 1,
    },
    {
      name: "Luna",
      type: "Bullie",
      age: 10,
      _petId: 2,
      _owner: 2,
    },
    {
      name: "Chase",
      type: "Teckle",
      age: 3,
      _petId: 3,
      _owner: 2,
    },
    {
      name: "Elmo",
      type: "Boxer",
      age: 5,
      _petId: 4,
      _owner: 1,
    },
  ],

  owners: [
    {
      name: "Pepe",
      surname: "Soro",
      _ownerId: 1,
      _dogs: [1, 4],
    },
    {
      name: "Leo",
      surname: "Piqueras",
      _ownerId: 2,
      _dogs: [2, 3],
    },
  ],
};

module.exports = seed;
