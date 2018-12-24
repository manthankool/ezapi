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
var counter = 0;

app.post('/createevent',(req,res) => {

  counter=counter+1;
  var e_id = "EZM00-"+counter;
  var subevent_id="EZM00-SUB-"+counter;
  var newEvent = new Event({

    eventname:req.body.eventname,
    event_id:e_id,
    supadminname:req.body.supadminname,
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
    driverusername:req.body.driverusername,

    driver:req.body.driver,
    driverusername:req.body.driverusername,
    name:req.body.name,
    phone:req.body.phone,
    licenseno:req.body.licenseno,
    driveremail:req.body.driveremail,
    whichcar:req.body.whichcar,

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
    hostnumber:req.body.hostnumber,
    subevent_id:req.body.subevent_id,

    subadmin:req.body.subadmin,
    name:req.body.name,
    username:req.body.username,
    password:req.body.password,
    email:req.body.email,
    phone:req.body.phone,
    address:req.body.address,

    admin:req.body.admin,
    name:req.body.name,
    username:req.body.username,
    password:req.body.password,
    email:req.body.email,
    phone:req.body.phone,
    address:req.body.address,
    subevent_id:req.body.subevent_id

  });
  newEvent.save().then((event) => {
    res.status(200).json(event);
  },(err) => {
    res.status(400).send(err);
  });
});



app.post('/driverlogin',(req,res) => {
  var username = req.body.username;
  var password = req.body.password;
  var event_id = req.body.event_id;
  Event.findOne({ 'event_id': event_id, 'admin.username': username, 'admin.password': password }, { 'admin.$': 1, 'admin.$': 2 }).then((event) => {

    if(!event){
      return res.status(401).send(`"${username}" username or password is incorrect, please try again!`);
    }else  {

      return res.status(400).redirect('/driverloggedin/'+event_id);
    }
  });
});

app.get('/driverloggedin/:event_id',(req,res) => {
  var event_id = req.params.event_id;
  Event.findOne({event_id:event_id}).then((file) => {
    if(!file){
      return res.status(404).send('File is not available');
    }
    res.status(200).send(file);
    app.patch('/update/:carnumber',(req,res) => {
      var carnumber = req.params.carnumber;
      var body = _.pick(req.body,['name','phone','address','email','department','area']);
      if(!ObjectID.isValid(id)){
        return res.status(404).send();
      }

      User.findOneAndUpdate(id,{$set:body},{new:true}).then((file) => {
        if(!file){
          return res.status(404).send();
        }
        else{
          return res.send({file});
        }


      }).catch((e) => {res.status(400).send()});
    });
  }).catch((e) => res.status(400).send());

});





// for the car and driver



//for the Admin
app.post('/adminlogin',(req,res) => {
  var username = req.body.username;
  var password = req.body.password;
  var event_id = req.body.event_id;
  Event.findOne({ 'event_id': event_id, 'admin.username': username, 'admin.password': password }, { 'admin.$': 2, 'admin.$': 3 }).then((event) => {

    if(!event){
      return res.status(401).send(`"${username}" username or password is incorrect, please try again!`);
    }else  {

      return res.status(400).redirect('/adminloggedin/'+event_id);
    }
  });
});

app.get('/adminloggedin/:event_id',(req,res) => {
  var event_id = req.params.event_id;
  Event.findOne({event_id:event_id}).then((file) => {
    if(!file){
      return res.status(404).send('File is not available');
    }
    return res.status(200).send(file);
  }).catch((e) => res.status(400).send());

});







//for the sub-Admin
app.post('/subalogin',(req,res) => {
  var username = req.body.username;
  var password = req.body.password;
  var event_id = req.body.event_id;
  Event.findOne({ 'event_id': event_id, 'subadmin.username': username, 'subadmin.password': password }, { 'subadmin.$': 2, 'subadmin.$': 3 }).then((event) => {

    if(!event){
      return res.status(401).send(`"${username}" username or password is incorrect, please try again!`);
    }else  {

      return res.status(400).redirect('/subloggedin/'+event_id);
    }
  });
});

app.get('/subloggedin/:event_id',(req,res) => {
  var event_id = req.params.event_id;
  Event.findOne({event_id:event_id}).then((file) => {
    if(!file){
      return res.status(404).send('File is not available');
    }
    return res.status(200).send(file);
  }).catch((e) => res.status(400).send());

});




// for super-ADMIN
app.post('/supalogin', (req, res) => {

  var username = req.body.username;
  var password = req.body.password;
  Event.findOne({username:username}).then((user) => {
    if(!user){
      return res.status(401).send(`${username} is not correct, please try again!`);
    }else if(password === user.password){
      Event.findOne({username:username}).then((event) => {
        if(!event){
          return res.status(404).send('Event did not happend!!!');
        }
        var event_id=event.event_id;
        return res.status(400).redirect('/createevent');
      }).catch((e) => res.status(400).send());

    }else{
      return res.status(401).send('Your password is incorrect');
    }


  });
});



app.get('/suploggedin/:event_id',(req,res) => {
  var event_id = req.params.event_id;
  Event.findOne({event_id:event_id}).then((file) => {
    if(!file){
      return res.status(404).send('File is not available');
    }
    return res.status(200).send(file);
  }).catch((e) => res.status(400).send());


});


// for developer purpose
app.get('/browse/:event_id',(req,res) => {
  var eventname = req.params.eventname;

  Event.findOne({eventname:eventname}).then((file) => {
    if(!file){
      return res.status(404).send('File is not available');
    }
    return res.status(200).json(file);
  }).catch((e) => res.status(400).send());
});


app.get('/allevents',(req,res) => {
  Event.find().then((data) => {
    return res.status(200).send(data);
  },(e) => {
    return res.status(400).send(e);
  });
});


app.listen(port, () => {
  console.log(`Starting server at ${port}`);
});
