const express = require("express");
const { InventoryModel } = require("../model/inventory.model");
const { oemSpecsModel } = require("../model/oemspecs.model")
const {auth} =require("../middleware/auth.middleware")
const inventoryRouter = express.Router();



// get the data from the inventory and also can filter and sort the data based the requirements


inventoryRouter.get("/inventory", async (req, res) => {

  const { order, filter, year, title, mileage, color } = req.query;
  const query = {};
  const sort = {};

  if (filter === "price") {
    sort.newPriceOfVehicle = order === "desc" ? -1 : 1;
  } 
   if (filter==="mileage") {
    sort.mileage = order === "desc" ? -1 : 1;
  }
 
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
    const deals = await InventoryModel.find(query).sort(sort).populate("oemId");
    res.status(200).send({ deals });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
});






inventoryRouter.post("/inventory", async (req, res) => {

  try {
    // Create a new instance of oemSpecsModel with data from the request body
    const newOemSpecs = new oemSpecsModel({
      nameOfModel: req.body.nameOfModel,
      yearOfModel: req.body.yearOfModel,
      newPriceOfVehicle: req.body.newPriceOfVehicle,
      colors: req.body.colors,
      mileage: req.body.mileage,
      power: req.body.power,
      maxSpeed: req.body.maxSpeed,
      img: req.body.img,
    });

    await newOemSpecs.save();

  
    let newInventoryModal = new InventoryModel(req.body);
    await newInventoryModal.save();

    res.status(200).send({ msg: "Deal Added Successs" });
  } catch (error) {
    res.send({ error });
  }
});


  
  inventoryRouter.patch("/inventory/:id",auth,async (req, res) => {
    const { id } = req.params;
   
    try {
      await InventoryModel.findByIdAndUpdate(id, req.body);
      res.status(200).send({ msg: "Updated Deal Success" });
    } catch (error) {
      res.status(500).send({ msg: error.message });
    }
  });
  
  //delete particular inventory route to deleteing the document by finding by id 
  
  inventoryRouter.delete("/inventory/:id",auth,async (req, res) => {
    const { id } = req.params;
  
    try {
      await InventoryModel.findByIdAndDelete(id);
      res.status(200).send({ msg: "Deleted Deal Success" });
    } catch (error) {
      res.status(500).send({ msg: error.message });
    }
  });
  

  inventoryRouter.delete("/inventory",auth,async (req, res) => {
    try {
      const { ids } = req.body;
  
      // Use the $in operator to delete documents with matching IDs
      await InventoryModel.deleteMany({ _id: { $in: ids } });
  
      res.status(200).send({ msg: "Deletion Successful" });
    } catch (error) {
      res.send({ error });
    }
  });
  


module.exports = { inventoryRouter };