var mongoose = require('mongoose');


var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};


var Driver = mongoose.model('Driver',{


});

var WorkForce = mongoose.model('WorkForce',{


});


var Hotel = mongoose.model('Hotel',{


});

var Car = mongoose.model('Car',{


});

var Event = mongoose.model('Event',{

  event:{
    name:{
      type:String,
      unique:true,
      minlength:6
    },
    superadmin:{
      username:{
        type:String,
        unique:true,
        minlength:6
      },
      password:{
        type:String,
        minlength:6
      }
    },
    subadmins:{
      username:{type:String,minlength:6,unique:true},
      password:{type:String,minlength:6}
    },
    admin:{
      username:{type:String,minlength:6,unique:true},
      password:{type:String,minlength:6}
    },

  }

});




module.exports = {
  Driver:Driver,
  WorkForce:WorkForce,
  Hotel:Hotel,
  Car:Car,
  Event:Event
};
