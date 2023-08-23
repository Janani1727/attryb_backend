const mongoose = require("mongoose");
const { oemSpecsModel } = require("./oemspecs.model");
const { UserModel } = require("./user.model");

// const inventorySchema = mongoose.Schema({
    
//   km: {
//     type: Number,
    
//   },
//   majorScratches: {
    
//     type: String,
//   },
//   price: {
    
//     type: Number,
//   },
//   orginalPaint: {
    
//     type: String,
//   },
//   accidents: {
    
//     type: Number,
//   },
//   prevBuyers: {
    
//     type: Number,
//   },
//   registrationPlace: {
    
//     type: String,
//   },
//   oemId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: oemSpecsModel,
//   },
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: UserModel,
//   },
//   img: { 
//     type: String, 
//     required: true
//  },
//   title: {
//     type: String,
    
//   },
//   des: {
//     type: Array,
    
//   },
//   nameOfModel: {
    
//     type: String,
//   },
//   yearOfModel: {
    
//     type: String,
//   },
//   newPriceOfVehicle: {
    
//     type: Number,
//   },
//   colors: {
    
//     type: Array,
//   },
//   mileage: {
    
//     type: Number,
//   },
//   power: {
    
//     type: Number,
//   },
//   maxSpeed: {
    
//     type: Number,
//   },
  
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: UserModel },

//   isActive: { type: Boolean, default: true },
// });

// const InventoryModel = mongoose.model("inventory", inventorySchema);

// module.exports = { InventoryModel };


const inventorySchema = mongoose.Schema({
  km: Number,
  majorScratches: String,
  price: Number,
  orginalPaint: String,
  accidents: Number,
  prevBuyers: Number,
  registrationPlace: String,
  oemId: { type: mongoose.Schema.Types.ObjectId, ref: oemSpecsModel },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: UserModel },
  img: {
    type: String,
    required: true,
  },
  des: [String],
  nameOfModel: String,
  yearOfModel: String,
  newPriceOfVehicle: Number,
  colors: [String], // Assuming colors is an array of strings
  mileage: Number,
  power: Number,
  maxSpeed: Number,
  isActive: { type: Boolean, default: true },
});

const InventoryModel = mongoose.model("inventory", inventorySchema);

module.exports = { InventoryModel };