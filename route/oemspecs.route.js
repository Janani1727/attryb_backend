const express = require("express")
const { OEMSpecsModel } = require("../model/oemspecs.model")
const OEMRouter = express.Router()

OEMRouter.get("/", async (req, res) => {
  let { searchModel, sortBy, sortOrder, filterColor, searchYear } = req.query;

  try {
    // Define the query object
    const query = {};

    // Search by model
    if (searchModel) {
      query.model = { $regex: searchModel, $options: "i" };
    }

    // Filter by color
    if (filterColor) {
      const colorRegex = new RegExp(filterColor, "i"); // Case-insensitive regex
      query.availableColors = colorRegex;
    }

    // Search by year
    if (searchYear) {
      query.year = searchYear;
    }

    // Define the sort options
    const sortOptions = {};

    if (sortBy && sortOrder) {
      // Check if sortBy and sortOrder are provided
      sortOptions[sortBy] = sortOrder === "asc" ? 1 : -1;
    } else {
      // Default sorting if sortBy or sortOrder is not provided
      sortOptions.listPrice = 1; // Default to ascending order by price
    }

    const data = await OEMSpecsModel.find(query).sort(sortOptions);

    res.send(data);
  } catch (err) {
    res.send(err.message);
    console.log('err:', err);
  }
});



OEMRouter.get("/:id", async (req, res) => {
    const ID = req.params.id
    console.log('id:', ID)
  
    try {
      const data = await OEMSpecsModel.find({_id:ID})
  
      res.send(data);
    } catch (err) {
      res.send(err.message);
      console.log('err:', err);
    }
  });
  

// First Time OEM data POST
OEMRouter.post("/post",async(req,res)=>{
    const data = req.body.data
    console.log('data:', data)
    try{
        const notes = await OEMSpecsModel.insertMany(data)
        res.send(notes)
    }catch(err){
        console.log({"msg":"Error Occured","error":err})
    }
})
module.exports={
    OEMRouter
}