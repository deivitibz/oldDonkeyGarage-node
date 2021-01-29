const express = require("express");
const app = express.Router();
const uuidv4 = require("uuid").v4;

const {User} = require("../../controller/mongoose/usuario.controller");
const userModel = require("../../models/user.model");
const mongoose = require("mongoose");

const {checkBody} = require("../utils");

app.get("/", (req, res) => {
  User.find((err, data) => {
    if (err) console.error(err);
    res.json(data);
  });
  //res.send('usuarios get');
});

app.get("/:id", async (req, res) => {
  const response = await User.findOne({_id: req.params.id});
  console.log(response);
  res.json(response);
});

app.post("/", async (req, res) => {
  try {
    const body = req.body;
    body.createdAt = new Date();
    body.updatedAt = new Date();
    const check = checkBody(req.body, userModel);

    if (!check) {
      throw {error: "falta algun campo"};
    } else {
      const user = new User(body);
      const response = await user.save();
      console.log(response);
      res.status(201).json({headers: req.headers, body, status: req.statusCode, response});
    }
  } catch (error) {
      
    res.status(404).json(error);
  }
});

app.put("/:id", async (req, res) => {
  try {
    const body = req.body;
    const params = req.params;

    body.updatedAt = new Date();

    const user = await User.findOne({_id: params.id});
    body.createdAt = user.createdAt;

    const response = await User.updateOne({_id: params.id}, body);

    //const response = await User.updateOne({_id: params.id}, {username: body.username, email: body.email, password: body.password, role: body.role})
    console.log(user);
    console.log(response);
    res.json(response);
  } catch (error) {
       res.json(error);
  }
});

app.delete("/:id", async (req, res) => {
  const response = await User.deleteOne({_id: req.params.id}, (err) =>
    console.log(err)
  );
  res.send(response);
});

module.exports = app;
