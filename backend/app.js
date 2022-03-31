const express = require("express");
const bodyparser = require("body-parser");
const globalErrorHandler = require("./public/utils/errorController");
const cors = require("cors");
const userRouter = require("./public/Routes/userRoute");
const residenceRouter = require("./public/Routes/residenceRoute");
const zoneRouter = require("./public/Routes/zoneRoute");
const locationRouter = require("./public/Routes/locationRoute");
const reviewRouter = require("./public/Routes/reviewRoute");
const tutorRouter = require("./public/Routes/seniorTutorRoute");
const nssPRouter = require("./public/Routes/nssPRoute");
const facilityRouter = require("./public/Routes/facilityRoute");
const mpRouter = require("./public/Routes/mpRoute");
const areampRouter = require("./public/Routes/areaMPRoute");

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(bodyparser.json());

app.use(express.static("public"));
app.use("/images", express.static("images"));

// xss-clean
// hpp
// helmet
// morgan
// express-mongo-sanitize
//cookie-parser

app.use("/api/v1/users", userRouter);
app.use("/api/v1/residences", residenceRouter);
app.use("/api/v1/facilities", facilityRouter);
app.use("/api/v1/zones", zoneRouter);
app.use("/api/v1/locations", locationRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/senior-tutors", tutorRouter);
app.use("/api/v1/nss-personnels", nssPRouter);
app.use("/api/v1/mps", mpRouter);
app.use("/api/v1/area-mps", areampRouter);

//request which are undefined.
app.all("*", (req, res, next) => {
	const url = `${req.originalUrl}`;
	next(new Error("The request at  " + url + " is not defined", 404));
});

//handles all global error
app.use(globalErrorHandler);
module.exports = app;
