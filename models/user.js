var mongoose = require('mongoose');
// const AutoIncrement = require('mongoose-sequence')(mongoose);
// const plugin = require('plugin');

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
    event_id:{
      type:String,
      default:'EZM00-'
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
    subadmin:[{
      name:{type:String,trim:true},
      username:{type:String,minlength:7},
      password:{type:String,minlength:7},
      email:{
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
      phone:{type:Number},
      address:{type:String}
    }],
    admin:[{
      name:{type:String,trim:true},
      username:{type:String,minlength:7},
      password:{type:String,minlength:7},
      whichevent:{type:String,trim:true},
      subevent_id:{type:String,trim:true},
      email:{
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
      phone:{type:Number},
      address:{type:String}
    }],
    car:[{
      id:{type:String},
      carname: {type:String},
      carnumber: {type:String,trim:true},
      caroccupied:{type:Boolean,default:true},
      carowner:{type:String},
      driverusername:{type:String},
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
      driverpassword:{type: String},
      whichcar:{type:String, trim:true},
      name: {type:String},
      phone: {type:Number},
      licenseno: {type:String},
      driverfree:{type:Boolean,default:true},
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
      hotelusername: {type:String,minlength:7},
      hotelpassword:{type: String,minlength:7},
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
      hostnumber:{type:String,trim:true},
      subevent_id:{type:String,trim:true}
    }]




});



var SuperAdmin = mongoose.model('SuperAdmin',{

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
