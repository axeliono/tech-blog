const express = require("express");
const routes = require("./controllers");
const path = require("path");
const session = require("express-session");
const exphbs = require("express-handlebars");

const app = express();
const PORT = process.env.PORT || 3002;

const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const sess = {
  secret: "super secret secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

const hbs = exphbs.create({});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
