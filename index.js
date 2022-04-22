const express = require("express");
const mongoose = require("mongoose");
const app = express();


app.use(express.json());
app.use(require("./routes"));

mongoose
  .connect("mongodb://localhost:27017/campingApp")
  .then(() => console.log("DB CONNECTED"))
  .catch((err) => console.log("err"));




const PORT = 5000;
app.listen(PORT, () => console.log(`SERVEUR STARTED ON PORT ${PORT}`));
