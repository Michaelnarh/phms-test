const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const userRouter = require("./public/Routes/userRoute");
const hostelRouter = require("./public/Routes/hostelRoute");
const zoneRouter = require("./public/Routes/zoneRoute");

const app = express();

app.use(cors());
app.use(bodyparser.json());

app.use("/api/v1/users/", userRouter);
app.use("/api/v1/hostels", hostelRouter);
app.use("/api/v1/zones", zoneRouter);

//request which are undefined.
app.all("*", (req, res, next) => {
	const url = `${req.originalUrl}`;
	next(new Error("The request at  " + url + " is not defined", 404));
});

module.exports = app;
