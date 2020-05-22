const mongoose =require('mongoose');
const schema =mongoose.Schema;
const bcrypt=require('bcryptjs');
const ObjectId =schema.Types.ObjectId;

// create user Employee & driver & user Customers schema  & model ..
const subscripeSchema =new schema({
auctionID :{
    type: ObjectId,
    ref: 'auction',
    required :[true ,'auction field is required .']
},
status :{
    type :Number,
    default: 1, // 1 = not , 2 = winner 
    required:false
},
userID :{
    type: ObjectId,
    ref: 'user',
    required :[true ,'userID field is required .'],
},
subscriptionPrice :{
    type :Number,
    required:true
},

}
,{
  timestamps: true // Saves createdAt and updatedAt as dates. createdAt will be our timestamp.

});
const subscripe =mongoose.model('subscripe', subscripeSchema);
module.exports =subscripe; 
