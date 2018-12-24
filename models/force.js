var mongoose = require('mongoose');


var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};


var Salesbase = mongoose.model('Salesbase',{


  companyname:{type:String,trim:true},
  accountnumber:{type:Number,unique:true},
  ifsc_code:{type:String,trim:true,unique:true},
  accountholder_name:{type:String,trim:true,unique:true},
  subscriptiontype:{type:String,trim:true},
  gstin:{type:String,trim:true},
  supadminname:{
    type:String,
    // required:true,
    trim:true,
    // unique: true,
    minlength:1
  },
  phone:{
    type:String,
    // required:true,
    trim:true,
    minlength:10
  },
  address:{
    type:String,
    // required:true,
    minlength:12
  },
  email:{
    type:String,
    // required:true,
    trim:true,
    lowercase:true,
    index:true,
    sparse:true,
    // required:'Please enter your email address',
    validate: [validateEmail, 'Please fill a valid email address'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],

    minlength:7
  },
  companylogo:{
    type:String,
    // required:true,
    data:Buffer
  },companyaddres:{type:String,trim:true},
  description:{type:String,trim:true},
  username:{type:String,unique:true,minlength:7},
  password:{type:String,minlength:7}





});



var Accounts = mongoose.model('Accounts',{


  billstatus:Boolean,
  subscription:{type:String,trim:true},


});


module.exports = {
  Sales:Sales,
  Accounts:Accounts,
  Developers:Developers,
  Salesbase:Salesbase
};
