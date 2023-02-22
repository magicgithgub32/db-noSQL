const mongoose = require("mongoose");
const dogs = require("./dogs");

mongoose.set("strict", false);
mongoose.set("strictPopulate", false);
mongoose.set("strictQuery", false);

// MONGO_URL: mongodb+srv://Rubcs:<password>@learningmongo.infj7gl.mongodb.net/?retryWrites=true&w=majority
mongoose
  .connect(
    "mongodb+srv://Rubcs:magic32@learningmongo.infj7gl.mongodb.net/test-db?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Conectado a db");
  })
  .catch((err) => {
    console.log("Error conectando a db", err);
  });

const emptySchema = new mongoose.Schema({});
const Dog = mongoose.model("Dog", emptySchema);
const Owner = mongoose.model("Owner", emptySchema);

// const main = async () => {
//     try {

//       const savedDogs = await Dog.insertMany(dogs)
//       console.log(savedDogs);

//     console.log('Los elementos se han guardado correctamente')
// } catch (err) {
//     console.log('Error creando los elementos')

// }
// }

//  main();

// const main = async () => {
//     try {
//        await Dog.deleteMany({
//             age: {$gt: 4},
//         })

//     }catch (err) {
//         console.log('Error creando los elementos')
//      }
// }

//     main();

// const main = async () => {
//   try {
//     const updatedDog = await Dog.findByIdAndUpdate(
//       "63f4e2142bb0a5dc382ce485",
//       {
//         $set: {
//           "owner.name": "Leo",
//           "owner.surname": "Piqueras",
//         },
//       },
//       { new: true }
//     ).lean();

//     console.log("actualizado el perrete", updatedDog);
//   } catch (err) {
//     console.log("Error creando los elementos");
//   }
// };

const main = async () => {
  try {
    const owner = await Owner.findOne({ name: "Leo" })
      .populate({
        path: "dogs",
        model: "Dog",
        select: {
          _id: true,
          name: true,
          type: true,
        },
      })
      .lean();
    console.log(owner);

    const dog = await Dog.find()
      .populate({
        path: "owner",
        model: "Owner",
        select: {
          _id: true,
          name: true,
          surname: true,
        },
      })
      .lean();
    console.log(dogs);
  } catch (err) {
    console.log("Error creando el elemento", err);
  }
};

main();
