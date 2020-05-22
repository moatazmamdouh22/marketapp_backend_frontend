const mongoose =require('mongoose');
const schema =mongoose.Schema;
const bcrypt=require('bcryptjs');
const ObjectId =schema.Types.ObjectId;

// create user Employee & driver & user Customers schema  & model ..
const userSchema =new schema({
fullname :{
    type :String,
    required :[true ,' user full name  field is required .'],
    max :120
},
mobile :{
    type :String,
    required :[true ,' user mobile  field is required .'],
    max :50,
    unique: [true ,'this mobile number already exist'],
    trim: true
},
email :{
    type :String,
    required :[true ,' user email  field is required .'],
    max :150,
    unique:[true ,'this email already exist'],
    trim: true
},
password :{
    type :String,
    required :[true ,' password  field is required .'],
    max :25,
    min:9,
    select: true
},
status :{
    type :Number,
    default: 1, // 1 = active , 2 = deactive 
    required:false
},
userKey:{
    type:String,
    required:false
},
personalImg:{
    type:String,
    required:false
},
birthday:{
    type:Date,
    required:false
},
categoryID :{
    type: ObjectId,
    ref: 'Category',
    required :false
},userCredit :{
    type :Number,
    required:false
},
facebookToken:{
    type:String,
    required:false
},

}
,{
  timestamps: true // Saves createdAt and updatedAt as dates. createdAt will be our timestamp.
});

const user =mongoose.model('user', userSchema);
module.exports =user; 