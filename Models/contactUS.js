const mongoose =require('mongoose');
const schema =mongoose.Schema;
const bcrypt=require('bcryptjs');
const ObjectId =schema.Types.ObjectId;

// create user Employee & driver & user Customers schema  & model ..
const contactUsSchema =new schema({
userID :{
    type: ObjectId,
    ref: 'user',
    required :false
},
msg :{
    type :String,
    required:true
},
imgPath :{
    type :String,
    required:false
},
status :{
    type :Number,
    default: 1, // 1 = unshow , 2 = show 
    required:false
},
fullname :{
    type :String,
    required :false,
    max :120
},
email :{
    type :String,
    required :false,
    max :150,
    trim: true
},
mobile :{
    type :String,
    required :false,
    max :50,
    trim: true
},
type :{
    type :Number,
    default: 1, // 1 = login , 2 = not login 
    required:false
},
}
,{
  timestamps: true // Saves createdAt and updatedAt as dates. createdAt will be our timestamp.

});

const contactUS =mongoose.model('contactUS', contactUsSchema);
module.exports =contactUS; 
