const { Client } = require('pg');
const client = new Client({
		user: 'P2pft',
		host: 'localhost',
		database: 'P2PFileTransfer',
		password: 'curTestPass$115',
		port: 3211,
});
exports.connect = function(done) {
	client.connect();
}
exports.getByUrl = function(url, done){
	const query = 'SELECT peerid FROM host_data WHERE url = ?';
	client.query(query, url,(err, res) => {
		if(err){
			console.log("Error: " + err.stack);
		} else {
			console.log(res.rows[0]);
		}
	})
}

exports.create = function(peerId, url, done){
	const query = 'INSERT INTO host_data SET peerid=$1 url=$2';
	client.query(query, [peerId, url],(err, res) => {
		if(err){
			console.log("Error: " + err.stack);
		} else {
			console.log(res.rows[0]);
		}
	})
}