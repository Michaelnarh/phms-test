const dotenv = require("dotenv");
const app = require("./app");
const mongoose = require("mongoose");

/**
 * handle uncaught E
 */

dotenv.config({ path: __dirname + "/.env" });

console.log(process.env.PORT);

if (process.env.NODE_ENV === "development") {
	console.log("started locally");
	mongoose
		.connect(process.env.DATABASE_LOCAL, {
			keepAlive: true,
			keepAliveInitialDelay: 300000,
		})
		.then((conc) => {
			console.log("db connected");
		});
} else if (process.env.NODE_ENV === "production") {
	mongoose
		.connect(process.env.MONGO_URL_CLUSTER, {
			keepAlive: true,
			keepAliveInitialDelay: 300000,
		})
		.then((conc) => {
			console.log("db connected");
		});
	console.log("started in production");
}

app.listen(process.env.PORT || 8081, () => {
	console.log("local server connected @  " + process.env.PORT);
});
