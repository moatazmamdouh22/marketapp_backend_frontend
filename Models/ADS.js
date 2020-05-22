const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

// create user Employee & driver & user Customers schema  & model ..
const ADSSchema = new schema({
    imgPath: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: false
    },
    status: {
        type: Number,
        default: 1, // 1 = active , 2 = deactive 
        required: false
    },
}
    , {
        timestamps: true // Saves createdAt and updatedAt as dates. createdAt will be our timestamp.

    });
const ADS = mongoose.model('ADS', ADSSchema);
module.exports = ADS; 
