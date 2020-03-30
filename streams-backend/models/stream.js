const mongoose = require('mongoose');

var StreamSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			require: true
		},
		description: {
			type: String,
			require: true
		},
		createdBy: {
			type: String,
			require: true
		}
	},
	{ timestamps: true }
);

var Stream = mongoose.model('Stream', StreamSchema);

module.exports = Stream;
