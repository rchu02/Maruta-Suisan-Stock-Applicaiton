const express = require("express");
const app = express();
const path = require("path");
const indexRoute = require("./routes/indexRoute")

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

const viewsPath = path.join(__dirname, "views");
app.set("views", viewsPath);

app.use("/", indexRoute);

app.listen(3000, function() {
    console.log(
      "Server running. Visit: localhost:3000"
    );
  });