const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const userRouter = require("./public/Routes/userRoute");
const residenceRouter = require("./public/Routes/residenceRoute");
const zoneRouter = require("./public/Routes/zoneRoute");
const reviewRouter = require("./public/Routes/reviewRoute");
const tutorRouter = require("./public/Routes/seniorTutorRoute");
const nssPRouter = require("./public/Routes/nssPRoute");
const facilityRouter = require("./public/Routes/facilityRoute");
const mpRouter = require("./public/Routes/mpRoute");

const app = express();
app.use(cors());
app.use(bodyparser.json());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/residences", residenceRouter);
app.use("/api/v1/facilities", facilityRouter);
app.use("/api/v1/zones", zoneRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/senior-tutors", tutorRouter);
app.use("/api/v1/nss-personnels", nssPRouter);
app.use("/api/v1/mps", mpRouter);
app.use("/api/v1/area_mps", mpRouter);

//request which are undefined.
app.all("*", (req, res, next) => {
	const url = `${req.originalUrl}`;
	next(new Error("The request at  " + url + " is not defined", 404));
});

module.exports = app;
