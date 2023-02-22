require("./db");
const seed = require("./seed");
const { Dog, Owner } = require("./models");

const main = async () => {
  console.log("<<<Guardando los documentos>>>");
  const dogs = await Dog.insertMany(seed.dogs);
  const owners = await Owner.insertMany(seed.owners);
  console.log("<<<Documentos guardados>>>");

  console.log("Actualizando Dogs con su Owner");

  await Promise.all(
    dogs.map(async (dog) => {
      const owner = owners.find((owner) => owner._ownerId === dog._owner);

      await dog.updateOne({ owner: owner._id });
    })
  );

  console.log("Dogs actualizados con su Owner");

  console.log("Actualizando Owner con sus Dogs");

  await Promise.all(
    owners.map(async (owner) => {
      const dbDogs = owner._dogs.map((dogId) => {
        const relatedDog = dogs.find((dog) => dog._petId === dogId);
        return relatedDog._id;
      });
      await owner.updateOne({ dogs: dbDogs });
    })
  );
  console.log("Owner actualizado con sus Dogs");
};

main()
  .then(() => {
    console.log("Script terminado");
    process.exit();
  })

  .catch((err) => {
    console.log("Error lanzando el script", err);
    process.exit(1);
  });
