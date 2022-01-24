const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

/**
 * handle uncaught E
 */

dotenv.config({ path: ".env" });

// if (process.env.NODE_ENV == 'development') {
// }

const PORT = process.env.PORT;
const DB = process.env.DATABASE_LOCAL;

mongoose
	.connect(DB, {
		useNewUrlParser: true,
		useCreateIndexes: true,
		useFindAndModify: false,
		useUnifiedTopology: true,
	})
	.then((conc) => {
		console.log("db connected");
	});

const server = app.listen(PORT, () => {
	console.log("local server connected " + PORT);
});
