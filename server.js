var _ = require('lodash');
var fs = require('fs');

const fileType = require('file-type');
var {User} = require('./models/user');
var {SuperAdmin} = require('./models/user');
var {Event} = require('./models/user');
var {Admin} = require('./models/user');

var {ObjectID} = require('mongodb');

var cors = require('cors');
var {mongoose} = require('./db/mongoose');
var _ = require('lodash');
var express = require('express');
var bodyParser = require('body-parser');


var app =express();

const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(cors({origin: 'http://localhost:3000'}));

app.post('/createevent',(req,res) => {

  var newEvent = new Event({

    eventname:req.body.eventname,
    subadminname:req.body.subadminname,
    phone:req.body.phone,
    address:req.body.address,
    email:req.body.email,
    companylogo:req.body.companylogo,
    username:req.body.username,
    password:req.body.password,
    car:req.body.car,
    id:req.body.carid,
    carname:req.body.carname,
    carnumber:req.body.carnumber,
    carowner:req.body.carowner,
    carownernumber:req.body.carownernumber,
    carowneremail:req.body.carowneremail,
    driver:req.body.driver,
    driverusername:req.body.driverusername,
    name:req.body.name,
    phone:req.body.phone,
    licenseno:req.body.licenseno,
    driveremail:req.body.driveremail,
    hotel:req.body.hotel,
    hotelusername:req.body.hotelusername,
    hotelname:req.body.hotelname,
    hoteladdress:req.body.hoteladdress,
    hotelnumber:req.body.hotelnumber,
    hotelemail:req.body.hotelemail,
    workforce:req.body.workforce,
    wfnumber:req.body.wfnumber,
    wfname:req.body.wfname,
    wfusername:req.body.wfusername,
    wfemail:req.body.wfemail,
    wfaddress:req.body.wfaddress,
    subevent:req.body.subevent,
    subeventname:req.body.subeventname,
    timing:req.body.timing,
    date:req.body.date,
    venue:req.body.venue,
    hostname:req.body.hostname,
    hostemail:req.body.hostemail,
    hostnumber:req.body.hostnumber

  });
  newEvent.save().then((event) => {
    res.status(200).json(event);
  },(err) => {
    res.status(400).send(err);
  });
});


app.get('/browse/:eventname',(req,res) => {
  var eventname = req.params.eventname;

  Event.findOne({eventname:eventname}).then((file) => {
    if(!file){
      return res.status(404).send('File is not available');
    }
    return res.status(200).json(file);
  }).catch((e) => res.status(400).send());
});





app.listen(port, () => {
  console.log(`Starting server at ${port}`);
});
