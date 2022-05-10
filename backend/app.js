const express = require("express");
const bodyparser = require("body-parser");
const cookies = require("cookie-parser");
const xclean = require("xss-clean");
const hpp = require("hpp");
const helmet = require("helmet");
const sanitize = require("express-mongo-sanitize");
const morgan = require("morgan");
const cors = require("cors");
const globalErrorHandler = require("./public/utils/errorController");
const userRouter = require("./public/Routes/userRoute");
const residenceRouter = require("./public/Routes/residenceRoute");
const zoneRouter = require("./public/Routes/zoneRoute");
const locationRouter = require("./public/Routes/locationRoute");
const reviewRouter = require("./public/Routes/reviewRoute");
const tutorRouter = require("./public/Routes/seniorTutorRoute");
const nssPRouter = require("./public/Routes/nssPRoute");
const facilityRouter = require("./public/Routes/facilityRoute");
const assemblyMemRouter = require("./public/Routes/assemblyMemRoute");
const studentmpRouter = require("./public/Routes/studentMPRoute");
const classRouter = require("./public/Routes/classRoute");
const registrationRouter = require("./public/Routes/registrationRoute");
const academicYearRouter = require("./public/Routes/acdemicYearRoute");
const reportRouter = require("./public/Routes/reportsRoute");

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", req.headers.origin);
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});
app.use(bodyparser.json());
app.use(cookies());
app.use(hpp());
app.use(xclean());

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
app.use("/api/v1/assembly-members", assemblyMemRouter);
app.use("/api/v1/student-mps", studentmpRouter);
app.use("/api/v1/classes", classRouter);
app.use("/api/v1/registration", registrationRouter);
app.use("/api/v1/academic-year", academicYearRouter);
app.use("/api/v1/reports", reportRouter);

//request which are undefined.
app.all("*", (req, res, next) => {
	const url = `${req.originalUrl}`;
	next(new Error("The request at  " + url + " is not defined", 404));
});

//handles all global error
app.use(globalErrorHandler);
module.exports = app;
