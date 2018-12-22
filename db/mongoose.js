var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/lalu',{ useNewUrlParser: true },(err,db) => {
  if(err){
    return console.log('Unable to connect to MongoDB server');
    db.close();
  }
  console.log('Connected to mongodb server');


});

module.exports ={mongoose};
