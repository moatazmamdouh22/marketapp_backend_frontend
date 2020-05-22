const mongoose =require('mongoose');
const schema =mongoose.Schema;
const bcrypt=require('bcryptjs');
const ObjectId =schema.Types.ObjectId;

// create user Employee & driver & user Customers schema  & model ..
const notifySchema =new schema({
status :{
    type :Number,
    default: 1, // 1 = active , 2 = deactive 
    required:false
},
type :{
    type :Number,
    default: 1, // 1 = from admin , 2 = from app 
    required:false
},
userID :{
    type: ObjectId,
    ref: 'user',
    required :[true ,' userIDF  field is required .']
},
msg :{
    type: String,
    required :[true ,' msg field is required .']
},
msgAR :{
    type: String,
    required :false
},
subscripeID :{
    type: ObjectId,
    ref: 'subscripe',
    required :false
},
auctionID :{
    type: ObjectId,
    ref: 'auction',
    required :false
},

}
,{
  timestamps: true // Saves createdAt and updatedAt as dates. createdAt will be our timestamp.

});
const notify =mongoose.model('notify', notifySchema);
module.exports =notify; 
