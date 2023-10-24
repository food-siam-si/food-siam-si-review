require("dotenv").config({ path: "./.env" });

const express = require("express");
const app = express();
const mongoose = require("mongoose");

let { MONGO_URI } = require('./config/env')

/*const swaggerJsDoc=require('swagger-jsdoc')
const swaggerUI=require('swagger-ui-express')*/

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use(express.json());

const reviewsRouter = require("./routes/reviews");
app.use("/reviews", reviewsRouter);

app.listen(process.env.PORT, () => console.log("Server Started"));
