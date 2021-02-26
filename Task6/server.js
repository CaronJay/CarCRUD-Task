var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();
const {MONGOURI}= require('./config/keys')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//Routes to carry each of the CRUD operations
require('./routes/new.js')(app);
require('./routes/home.js')(app);

require('./routes/delete.js')(app);
require('./routes/updateByID.js')(app);
require('./routes/updateByOwner.js')(app);
require('./routes/homeOlderCars.js')(app);

mongoose.connect(MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology:true
})


  
  mongoose.connection.on('error', function() {
      console.log('Connection to Mongo established.');
      console.log('Could not connect to the database. Exiting now...');
      process.exit();
  });
  mongoose.connection.once('open', function() {
      console.log("Successfully connected to the database");
  })

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server is running on Port ${PORT}`));