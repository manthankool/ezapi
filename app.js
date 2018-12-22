var _ = require('lodash');
var fs = require('fs');

const fileType = require('file-type');
var {User} = require('./models/user');
var {SuperAdmin} = require('./models/user');
var {SubAdmin} = require('./models/user');
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




// for the team
app.get('/browse/:name',(req,res) => {
  var name = req.params.name;

  User.findOne({name:name}).then((file) => {
    if(!file){
      return res.status(404).send('File is not available');
    }
    return res.status(200).send({file});
  }).catch((e) => res.status(400).send());
});

app.post('/regteam',(req,res) => {

  var newUser = new User({
    name:req.body.name,
    phone:req.body.phone,
    address:req.body.address,
    email:req.body.email,
    department:req.body.department,
    area:req.body.area,
    username:req.body.username,
    password:req.body.password

  });
  newUser.save().then((doc) => {
    res.status(200).send(doc);
  },(err) => {
    res.status(400).send(err);
  });
});

app.delete('/delete/:name',(req,res)=> {
  var name = req.params.name;

  User.deleteMany({name:name}).then((file) => {
    if(!file){
      return res.status(404).send();
    }
      return res.status(200).send({file});
  }).catch((e) => {
    console.log(e);
    res.status(400).send()
  });
});

app.patch('/update/:id',(req,res) => {
  var id = req.params.id;
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


app.get('/supalogin',(req,res) => {
  res.status(200).send("Welcome to the login page");

  app.post('/createevent',(req,res) => {
    var newUser = new SubAdmin({
      name:req.body.name,
      phone:req.body.phone,
      eventid:req.body.eventid,
      email:req.body.email,
      eventname:req.body.eventname,
      description:req.body.description,
      username:req.body.username,
      password:req.body.password

    });
    newUser.save().then((doc) => {
      return res.status(200).send(doc);
    },(err) => {
      return res.status(400).send(err);
    });
  });
});




app.post('/supalogin', (req, res) => {

  var username = req.body.username;
  var password = req.body.password;
  SuperAdmin.findOne({username:username}).then((user) => {
    if(!user){
      return res.status(401).send(`${username} is not correct, please try again!`);
    }else if(password === user.password){
      return res.status(400).redirect('/supalogin');
    }else{
      return res.status(401).send('Your password is incorrect');
    }


  });
});

// for the subadmin login use below
app.get('/subalogin',(req,res) => {
  return res.status(200).send("Welcome to the login page of subadmin");

  app.post('/createadmin',(req,res) => {
    var newUser = new Admin({
      name:req.body.name,
      phone:req.body.phone,
      eventid:req.body.eventid,
      email:req.body.email,
      eventname:req.body.eventname,
      description:req.body.description,
      username:req.body.username,
      password:req.body.password

    });
    newUser.save().then((doc) => {
      return res.status(200).send(doc);
    },(err) => {
      return res.status(400).send(err);
    });
  });
});


app.post('/subalogin', (req, res) => {

  var username = req.body.username;
  var password = req.body.password;
  SubAdmin.findOne({username:username}).then((user) => {
    if(!user){
      return res.status(401).send(`${username} is not correct, please try again!`);
    }else if(password === user.password){
      return res.status(400).redirect('/subalogin');
    }else{
      return res.status(401).send('Your password is incorrect');
    }


  });
});





app.get('/team',(req,res) => {
  User.find().then((data) => {

    var obj=[];
    var file={};
    var file1=[];

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    res.setHeader('Access-Control-Expose-Headers', 'X-Total-Count');
    res.setHeader('X-Total-Count', '319');

    res.setHeader('Access-Control-Expose-Headers','Content-Range');

    res.setHeader('Content-Range', 'categories 0 - 5 / 5');


    for (var key =0 ; key<data.length; key++){
      file["id"]=data[key]["_id"];

      file["name"]=data[key]["name"];
      file["phone"]=data[key]["phone"];
      file["address"]=data[key]["address"];
      file["email"]=data[key]["email"];
      file["department"]=data[key]["department"];
      file["area"]=data[key]["area"];
      file["username"]=data[key]["username"];
      file["password"]=data[key]["password"];


      obj.push(file);
      file={};


    }
    return res.status(200).json(obj);
  },(e) => {
    return res.status(400).send(e);
  });
});


app.post('/regsa',(req,res) => {

  var newSuperAdmin = new SuperAdmin({
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
    car:req.body.car,
    car:req.body.car,
    car:req.body.car,

  });
  newSuperAdmin.save().then((doc) => {
    res.status(200).send(doc);
  },(err) => {
    res.status(400).send(err);
  });
});



app.get('/sadmin',(req,res) => {
  SuperAdmin.find().then((data) => {

    var obj=[];
    var file={};


    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    res.setHeader('Access-Control-Expose-Headers', 'X-Total-Count');
    res.setHeader('X-Total-Count', '319');

    res.setHeader('Access-Control-Expose-Headers','Content-Range');

    res.setHeader('Content-Range', 'categories 0 - 5 / 5');


    for (var key =0 ; key<data.length; key++){
      file["id"]=data[key]["_id"];

      file["name"]=data[key]["name"];
      file["phone"]=data[key]["phone"];
      file["address"]=data[key]["address"];
      file["email"]=data[key]["email"];
      file["companylogo"]=data[key]["companylogo"];
      file["username"]=data[key]["username"];
      file["password"]=data[key]["password"];


      obj.push(file);
      file={};


    }
    return res.status(200).json(obj);
  },(e) => {
    return res.status(400).send(e);
  });
});


app.listen(port, () => {
  console.log(`Starting server at ${port}`);
});
