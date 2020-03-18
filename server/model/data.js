const mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

const dataSchema = mongoose.Schema({
	title: { type: String, required: true },
});

dataSchema.plugin(timestamps);
module.exports = Data = mongoose.model('Data', dataSchema);