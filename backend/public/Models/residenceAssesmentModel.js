const mongoose = require("mongoose");

const residenceAssesmentSchema = mongoose.Schema({
	residence: { type: mongoose.Schema.Types.ObjectId, ref: "Residence" },
	location: {
		proximity: {
			veryNear: { type: Boolean },
			near: { type: Boolean },
			veryFarWTP: { type: Boolean },
			veryFarMTP: { type: Boolean },
		},
		acessibiltiy: {
			veryAccessible: { type: Boolean },
			accessible: { type: Boolean },
			notAccessible: { type: Boolean },
		},
		areaPrioritization: {
			area1: { type: Boolean },
			area2: { type: Boolean },
			area3: { type: Boolean },
			area4: { type: Boolean },
			area5: { type: Boolean },
			area6: { type: Boolean },
		},
	},
	occupancy: {
		oneInOne: { type: Boolean },
		twoInOne: { type: Boolean },
		threeInOne: { type: Boolean },
		fourtInOne: { type: Boolean },
		fiveInOneOrMore: { type: Boolean },
	},
	facilities: {
		roomType: {
			selfContained: { type: Boolean },
			cBSharedAndSelfContained: { type: Boolean },
			sharedLavatoryTwoOrThree: { type: Boolean },
			sharedLavatoryThreePlus: { type: Boolean },
		},
		roomFurnished: { type: Boolean },
		studyRoom: { type: Boolean },
		tvRoom: { type: Boolean },
		security: {
			functioningCCTV: { type: Boolean },
			electricFencing: { type: Boolean },
			walled: { type: Boolean },
			gated: { type: Boolean },
		},
		kitchenType: {
			roomSpecific: { type: Boolean },
			shared: { type: Boolean },
			notAvailable: { type: Boolean },
		},
	},
	uitility: {
		altPower: { type: Boolean },
		meterType: {
			roomSpecific: { type: Boolean },
			shared: { type: Boolean },
		},

		waterSupply: {
			waterSource: {
				mechanizedBorhole: { type: Boolean },
				manualBorhole: { type: Boolean },
				ghanaWater: { type: Boolean },
			},
			reliability: {
				veryReliable: { type: Boolean },
				reliable: { type: Boolean },
				unReliable: { type: Boolean },
			},
		},
		electricityPayment: {
			fullyByResidence: { type: Boolean },
			shared: { type: Boolean },
			fullyByTenants: { type: Boolean },
		},
	},
	services: {
		porters: {
			dayAndNight: { type: Boolean },
			dayOnly: { type: Boolean },
			nightOnly: { type: Boolean },
			noPoter: { type: Boolean },
		},
		securityPersonnel: {
			dayAndNight: { type: Boolean },
			dayOnly: { type: Boolean },
			nightOnly: { type: Boolean },
			noSecurity: { type: Boolean },
		},
		cleaners: {
			dayAndNight: { type: Boolean },
			dayOnly: { type: Boolean },
			nightOnly: { type: Boolean },
			noSecurity: { type: Boolean },
		},
		managers: {
			managerNotOwner: { type: Boolean },
			managerAsOwner: { type: Boolean },
			managerAsPorter: { type: Boolean },
		},
	},
	extraServices: {
		paidTVChannnel: {
			tvAvToRoomsAndAll: { type: Boolean },
			tvAvToRoomsOnly: { type: Boolean },
			otherServiceAtTvRoom: { type: Boolean },
		},
		airConditioner: {
			available: { type: Boolean },
		},
		roomSpecificTv: {
			available: { type: Boolean },
		},
		fridges: {
			available: { type: Boolean },
		},
		gasCylinder: {
			commonToAll: { type: Boolean },
			roomSpecific: { type: Boolean },
		},
		gasSupply: {
			available: { type: Boolean },
		},

		cookingStove: {
			roomSpecific: { type: Boolean },
			commonToAll: { type: Boolean },
		},
		waterHeater: {
			available: { type: Boolean },
		},
	},
	score: { type: Number, default: 0 },
});

module.exports = mongoose.model("ResidenceAssesment", residenceAssesmentSchema);
