require("./db");

const {
  cleanCollections,
  saveDocuments,
  updateDogs,
  updateOwners,
  cleanPrivateFields,
} = require("./db-functions");

const main = async () => {
  await cleanCollections();

  const { dogs, owners } = await saveDocuments();

  await updateDogs(dogs, owners);

  await updateOwners(dogs, owners);

  await cleanPrivateFields();
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
