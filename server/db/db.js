const { Client } = require('pg');
const client = new Client({
		user: 'P2pft',
		host: 'localhost',
		database: 'P2PFileTransfer',
		password: 'curTestPass$115',
		port: 5432,
});

exports.connect = function(done) {
	client.connect(function(err) {
		if(err){
			console.log("Unable to connect to db");
			process.exit(1);
		}else{
			console.log("Connected to db");
		}
	});
}

exports.getByUrl = function(url, done){
	const query = 'SELECT peerid FROM host_data WHERE url = $1';
	return client.query(query, [url], (err, res) => {
		done(err, res);
	});
}

exports.create = function(peerid, url, done){
	const query = 'INSERT INTO host_data(peerid, url) VALUES($1,$2) RETURNING *';
	client.query(query, [peerid, url], (err, res) => {
		done(err, res);
	});
}