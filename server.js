require("dotenv").config({ path: "./.env" });

const express = require("express");
const app = express();
const mongoose = require("mongoose");

/*const swaggerJsDoc=require('swagger-jsdoc')
const swaggerUI=require('swagger-ui-express')*/

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));
/*const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Subscriber API",
			version: "1.0.0",
			description: "A simple Express Subscriber API",
		},
		servers: [
			{
				url: "http://localhost:5000",
			},
		],
	},
	apis: ["./routes/*.js"],
};*/

/*const specs = swaggerJsDoc(options);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));*/

app.use(express.json());

const reviewsRouter = require("./routes/reviews");
app.use("/reviews", reviewsRouter);

app.listen(process.env.PORT, () => console.log("Server Started"));
