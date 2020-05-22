const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const ObjectId = schema.Types.ObjectId;
// create user Employee & driver & user Customers schema  & model ..
const auctionSchema = new schema({
    appName: {
        type: String,
        required: false
    },
    img1: {
        type: String,
        required: [true, ' img1 field is required .']
    },
    img2: {
        type: String,
        required: false
    },
    img3: {
        type: String,
        required: false
    },
    img4: {
        type: String,
        required: false
    },
    img5: {
        type: String,
        required: false
    },
    img6: {
        type: String,
        required: false
    },
    description:{
        type:String,
        required:[true, ' description field is required .']
    },
    userID :{
        type: ObjectId,
        ref: 'user',
        required :false
    },
    mobile :{
        type :String,
        required :[true ,' user mobile  field is required .'],
        max :50,
        trim: true
    },
    status :{
        type :Number,
        default: 1, // 1 = pending , 2 = accept , 3 = reject 4 = finished
        required:false
    },
    addedBy :{
        type :Number,
        default: 1, // 1 = user , 2 = admin 
        required:false
    },
    startDate :{
        type :Date,
        required:false
    },
    endDate:{
        type :Date,
        required:false
    },
    startPrice:{
        type :Number,
        required:false
    },
    minimumPrice:{
        type :Number,
        required:false
    },
    startH:{
        type :Number,
        required:false
    },
    endH:{
        type :Number,
        required:false
    },
    isInsurance:{
        type :Number,
        default: 0, // 1 = no , 2 = yes 
        required:false
    },
    insurance:{
        type :Number,
        default: 0,
        required:false
    },
    appstoreLink:{
        type :String,
        required:false
    },
    playstoreLink:{
        type :String,
        required:false
    },
    highestPrice:{
        type :String,
        required:false
    },
    categoryID :{
        type: ObjectId,
        ref: 'Category',
        required :false
    },
    highestPrice:{
        type :String,
        required:false
    },
    conditions:{
        type :String,
        required:false
    },

}
    , {
        timestamps: true // Saves createdAt and updatedAt as dates. createdAt will be our timestamp.
    });

const auction = mongoose.model('auction', auctionSchema);
module.exports = auction; 