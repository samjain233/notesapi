const express = require("express");

const app = express();
app.use(express.json());

// app.use("/", api);

app.get("/", (req, res) => {
  const object = {
    message: "server is running",
    statusCode: 200,
  };
  res.status(200).json(object);
});

const port = 3000;
app.listen(port, function () {
  console.log("app listening on port : " + port);
});