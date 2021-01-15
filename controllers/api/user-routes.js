const router = require("express").Router();
const { User, Post } = require("../../models");

//GET users    /api/users
router.get("/", (req, res) => {
  User.findAll({
    //eventually exclude password
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//GET single user /api/users/:id
router.get("/:id", (req, res) => {
  User.findOne({
    //eventually exclude password
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Post,
        //   choose necessary attributes to JOIN
        //   attributes: ['']
      },
    ],
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//POST create new user
router.post("/", (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  }).then((dbUserData) => {
    //add session info when creating login routes
    res.json(dbUserData);
  });
});

//PUT update user info
router.put("/:id", (req, res) => {
  User.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData[0]) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
