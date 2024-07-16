const express = require("express");
// const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const authRoute = require("./routes/auth");
const noteRoute = require("./routes/note");

const app = express();
const port = process.env.PORT || 8000;

//connect Database
mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("Connection Complete"))
  .catch((err) => console.log(err));

//middleware
app.use(express.json());
// app.use(cors());

//routes
app.get("/", (req, res) => {
  res.send("This is my API Running...");
});
app.use("/api", authRoute);
app.use("/api", noteRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
