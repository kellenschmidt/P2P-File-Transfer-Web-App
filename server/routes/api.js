const express = require('express');
const router = express.Router();
const db = require('../db/db.js');

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

db.connect(function(err) {
	if(err){
		console.log("Unable to connect to db");
		process.exit(1);
	}else{
		console.log("Connected to db");
	}
});

db.getByUrl(function(url, err) {
  if(err) {
    console.log("Unable to retrieve url");
    process.exit(1);
  }else{
    console.log("Got url");
  }
});


db.create(function(peerid, url, err) {
  if(err) {
    console.log("Unable to update peerid and url");
    process.exit(1);
  }else{
    console.log("Updated peerid and url")
  }
});


module.exports = router;
