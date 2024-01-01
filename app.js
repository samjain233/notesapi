require("dotenv").config();
const express = require("express");

const app = express();
app.use(express.json());

//importing routes---------------------------
const api = require("./routes/api");

//routes--------------------------------------
app.use("/api", api);

//home route----------------------------------
app.get("/", async (req, res) => {
  try {
    const object = {
      status: true,
      message: "server is running",
      githubUrl: "https://github.com/samjain233/notesapi",
      documentation:
        "https://github.com/samjain233/notesapi/blob/main/README.md",
    };
    res.status(200).json(object);
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, error: "Internal Server Error" });
  }
});

//wildcard route ----------------------------------------------
app.get("*", (req, res) => {
  try {
    const obj = {
      status: false,
      error: "route doesn't exists",
    };
    res.status(404).json(obj);
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, error: "Internal Server Error" });
  }
});

//listening on port 3000 --------------------------------------
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("app listening on port : " + port);
});

module.exports = app;