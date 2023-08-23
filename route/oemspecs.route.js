const express = require("express");
const { oemSpecsModel } = require("../model/oemspecs.model");

const oemSpecsRouter = express.Router();



oemSpecsRouter.get("/getspecs", async (req, res) => {

  const {  year, title, color } = req.query;
  const query = {};

 
  if (year) {
    query.yearOfModel = year;
  }

  if (title) {
    query.nameOfModel = new RegExp(title, 'i'); // Case-insensitive search
  }

  if (color) {
    query.colors = new RegExp(color, 'i'); // Case-insensitive search for color
  }



  try {
    const deals = await oemSpecsModel.find(query);
    res.status(200).send({ deals });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
});

// In oemSpecs.route.js

oemSpecsRouter.post("/oem", async (req, res) => {
  try {
    const newOemSpecs = new oemSpecsModel(req.body);
    await newOemSpecs.save();
    res.status(200).send({ msg: "OEM Specs Created Successfully", oemId: newOemSpecs._id });
  } catch (error) {
    res.status(500).send({ error: "Failed to create OEM Specs" });
  }
});


module.exports = { oemSpecsRouter };