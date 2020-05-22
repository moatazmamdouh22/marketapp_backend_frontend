const mongoose =require('mongoose');
const schema =mongoose.Schema;
const bcrypt=require('bcryptjs');

// create user Employee & driver & user Customers schema  & model ..
const termsPolicySchema =new schema({
titleAr :{
    type :String,
    required :[true ,' titleAr  field is required .']
},
titleEN :{
    type :String,
    required :[true ,' titleEN  field is required .']
},
type :{
    type :Number,// 1 = terms , 2 = about app
    required:true
},
status :{
    type :Number,// 1 = yes , 2 = no
    default: 1, // 1 = active , 2 = deactive 
    required:true
},

videoLink: {
    type: String,
    required: false
},
}
,{
  timestamps: true // Saves createdAt and updatedAt as dates. createdAt will be our timestamp.

});

const termsPolicy =mongoose.model('termsPolicy', termsPolicySchema);
module.exports =termsPolicy; 
