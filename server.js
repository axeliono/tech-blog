const express = require("express");
const routes = require("./controllers");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3002;

const sequelize = require("./config/connection");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
