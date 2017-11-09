const express = require('express');
const router = express.Router();
const { Pool, Client } = require('pg');
const client = new Client();
const pool = new Pool();

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('Peer api online');
});

// PeerJS setup
srv = express().listen(process.env.PORT);
express().use('/peer', require('peer').ExpressPeerServer(srv, { debug: true }))

module.exports = router;
