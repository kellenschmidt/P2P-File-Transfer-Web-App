const express = require('express');
const router = express.Router();
const db = require('../db/db.js');

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

// Get peerId by url
router.get('/:url', (req, res) => {
  db.getByUrl(req.params.url, (err, result) => {
    if (err == null) {
      res.status(200).json({ Status: 'Success', peerId: result });
    } else if (result.rows.length == 0) {
      res.status(404).json({ Status: 'Failure', Error: err });
    } else {
      res.status(500).json({ Status: 'Failure', Error: err });
    }
  })
})

// Create new peerId:url relationship in db
router.post('/', (req, res) => {
  db.create(req.peerId, req.url, (err, result) => {
    if (err == null) {
      res.status(201).json({ Status: 'Success' });
    } else {
      res.status(500).json({ Status: 'Failure', Error: err });
    }
  })
})

module.exports = router;
