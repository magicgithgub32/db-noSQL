const seed = require("./seed");
const { Dog, Owner } = require("./models");
const { owners, dogs } = require("./seed");

const cleanCollections = async () => {
  await Dog.collection.drop();
  await Owner.collection.drop();

  console.log("Colecciones limpias");
};

const saveDocuments = async () => {
  const dogs = await Dog.insertMany(seed.dogs);
  const owners = await Owner.insertMany(seed.owners);
  console.log("<<<Documentos guardados>>>");

  return {
    dogs,
    owners,
  };
};

console.log(owners);
console.log(dogs);

const updateDogs = async (dogs, owners) => {
  await Promise.all(
    dogs.map(async (dog) => {
      const owner = owners.find((owner) => owner._ownerId === dog._owner);

      await dog.updateOne({ owner: owner._id });
    })
  );
  console.log("Dogs actualizados con su Owner");
};

const updateOwners = async (dogs, owners) => {
  await Promise.all(
    owners.map(async (owner) => {
      const dbDogs = owner._dogs.map((dogId) => {
        const relatedDog = dogs.find((dog) => dog._petId === dogId);
        return relatedDog._id;
      });
      await owner.updateOne({ dogs: dbDogs });
    })
  );
  console.log("Owners actualizados con sus Dogs");
};

const cleanPrivateFields = async () => {
  await Owner.updateMany({}, { $unset: { _ownerId: 1, _dogs: 1 } });
  await Dog.updateMany({}, { $unset: { _petId: 1, _owner: 1 } });
  console.log("Campos utilitarios eliminados");
};

module.exports = {
  cleanCollections,
  saveDocuments,
  updateDogs,
  updateOwners,
  cleanPrivateFields,
};
