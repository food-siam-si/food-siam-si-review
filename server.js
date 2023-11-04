require("dotenv").config({ path: "./.env" });

const express = require("express");
const app = express();
const mongoose = require("mongoose");

let { MONGO_URI } = require('./config/env')

/*const swaggerJsDoc=require('swagger-jsdoc')
const swaggerUI=require('swagger-ui-express')*/

const startServer = async () => {
  await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  app.use(express.json());
  
  const reviewsRouter = require("./routes/reviews");
  app.use("/reviews", reviewsRouter);

  app.listen(process.env.PORT, () => console.log("Server Started"));
}  

startServer();