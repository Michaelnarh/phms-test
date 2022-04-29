const mongoose = require("mongoose");
const Residence = require("./residenceModel");

const reviewSchema = mongoose.Schema(
	{
		review: { type: String, required: [true, "Review cannot be empty"] },
		rating: { type: Number, max: 5, min: 0 },
		author: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // will be changed later
		residence: { type: mongoose.Schema.Types.ObjectId, ref: "Residence" },
		createdAt: { type: Date, default: Date.now() },
	},
	{
		toJSON: { virtuals: true }, //ensure json populate
		toObject: { virtuals: true }, //ensure to object populate
	}
);

reviewSchema.pre(/^find/, function (next) {
	// this.populate({
	// 	path: "residence",
	// 	select: ["name", "_id"],
	// }).populate({ path: "author", select: ["username"] });
	this.populate({ path: "author", select: ["username"] });

	next();
});

reviewSchema.statics.calcAverageRating = async function (residenceId) {
	const stats = await this.aggregate([
		{ $match: { residence: residenceId } },
		{
			$group: {
				_id: "$residence",
				nRating: { $sum: 1 },
				avgRating: { $avg: "$rating" },
			},
		},
	]);
	console.log(stats);
	if (stats[0].length > 0) {
		// await Residence.findByIdAndUpdate(residenceId, {
		// 	ratingAverage: stats[0]?.avgRating,
		// 	ratingQuantity: stats[0]?.nRating,
		// });
	} else {
		// await Residence.findByIdAndUpdate(residenceId, {
		// 	ratingAverage: 4.5,
		// 	ratingQuantity: 0,
		// });
	}
};

reviewSchema.post("save", function () {
	this.constructor.calcAverageRating(this.residence);
});

reviewSchema.pre(/findOneAnd/, async function (next) {
	this.review = await this.findOne();
	next();
});

reviewSchema.post(/findOneAnd/, async function () {
	await this.review.constructor.calcAverageRating(this.review.residence);
});

reviewSchema.pre("remove", function (next) {
	Residence.remove({ review: this._id });
	next();
});
module.exports = mongoose.model("Review", reviewSchema);
