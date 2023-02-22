const mongoose = require("mongoose");

mongoose.set("strict", false);
mongoose.set("strictQuery", false);
mongoose.set("strictPopulate", false);

mongoose
  .connect(
    "mongodb+srv://Rubcs:magic32@learningmongo.infj7gl.mongodb.net/pet-shop?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to DB!");
  })
  .catch((err) => {
    console.log("Error connecting to DB", err);
    process.exit(1);
  });
