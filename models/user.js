var mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const plugin = require('plugin');
var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
// Event.plugin(AutoIncrement, {inc_field: 'id'});



var Event = mongoose.model('Event',{


    eventname:{
      type:String,
      // unique:true,
      minlength:6
    },
    subadminname:{
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
    },
    username:{
      type:String,
      // required:true,
      trim: true,
      minlength:7
    },
    password:{
      // unique:true,
      type:String,
      minlength:7
    },
    car:[{
      id:{type:String},
      carname: {type:String},
      carnumber: {type:String},
      carowner:{type:String},
      carownernumber : {type:Number},
      carowneremail:{
          type:String,
          required:true,
          trim:true,
          lowercase:true,
          index:true,
          sparse:true,
          required:'Please enter your email address',
          validate: [validateEmail, 'Please fill a valid email address'],
          match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        }
      }],

    driver:[{
      driverusername:{type: String},
      name: {type:String},
      phone: {type:Number},
      licenseno: {type:String},
      driveremail:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        index:true,
        sparse:true,
        required:'Please enter your email address',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
      }
    }],

    hotel:[{
      hotelusername: {type:String},
      hotelname: {type:String},
      hoteladdress: {type:String},
      hotelnumber: {type:Number},
      hotelemail:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        index:true,
        sparse:true,
        required:'Please enter your email address',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
      }
    }],
    //
    //
    workforce:[{
      wfusername:{type:String},
      wfname: {type:String},
      wfnumber: {type:Number},
      wfemail: {type:String},
      wfaddress: {type:String},

    }],

    subevent:[{
      subeventname:{type:String},
      timing:{type:String},
      date:{type:String},
      venue:{type:String},
      hostname:{type:String,trim:true},
      hostemail:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        index:true,
        sparse:true,
        required:'Please enter your email address',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
      },
      hostnumber:{type:String,trim:true}
    }]




});



var SubAdmin = mongoose.model('SubAdmin',{

  name:{
    type:String,
    required:true,
    trim:true,
    unique: true,
    minlength:8
  },
  phone:{
    type:String,
    required:true,
    trim:true,
    length:10
  },
  eventid:{
    type:String,
    required:true,
    minlength:5
  },
  email:{
    type:String,
    required:true,
    trim:true,
    lowercase:true,
    index:true,
    sparse:true,
    required:'Please enter your email address',
    validate: [validateEmail, 'Please fill a valid email address'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],

    minlength:1
  },
  eventname:{
    type:String,
    required:true,
    trim:true,
    minlength:3
  },
  description:{
    type:String,
    required:false,
    trim: true,
    minlength:3
  },
  username:{
    type:String,
    unique:true,
    minlength:8
  },
  password:{
    type:String,
    minlength:7
  }



});



var Admin = mongoose.model('Admin',{

  name:{
    type:String,
    required:true,
    trim:true,
    unique: true,
    minlength:8
  },
  phone:{
    type:String,
    required:true,
    trim:true,
    length:10
  },
  eventid:{
    type:String,
    required:true,
    minlength:5
  },
  email:{
    type:String,
    required:true,
    trim:true,
    lowercase:true,
    index:true,
    sparse:true,
    required:'Please enter your email address',
    validate: [validateEmail, 'Please fill a valid email address'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],

    minlength:1
  },
  eventname:{
    type:String,
    required:true,
    trim:true,
    minlength:3
  },
  description:{
    type:String,
    required:false,
    trim: true,
    minlength:3
  },
  username:{
    type:String,
    unique:true,
    minlength:8
  },
  password:{
    type:String,
    minlength:7
  }



});




module.exports = {
  Event:Event

};
