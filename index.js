const express = require("express");
const { dataBaseConnection } = require("./config/db")
require("dotenv").config();

const cors = require("cors");
const { userRouter } = require("./route/user.route");
const { oemSpecsRouter } = require("./route/oemspecs.route");
const { inventoryRouter } = require("./route/inventory.route");


const app = express();

app.use(cors());

app.use(express.json());

app.use("/", userRouter);

app.use("/", oemSpecsRouter);


app.use("/", inventoryRouter);

app.get("/", function(req, res){
res.send("hello world")
})

app.listen(8080, async () => {
  try {
    console.log(`Server is Started at  ${process.env.PORT}`);

    await dataBaseConnection;

    console.log("Data Base Is Connected to Server");
  } catch (error) {
    console.log(error);
  }
});