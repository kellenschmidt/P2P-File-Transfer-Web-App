const { Client } = require('pg');
const client = new Client({
		user: '',
		host: '',
		database: '',
		password: '',
		port: 3211,
});
exports.connect = function(done) {
	client.connect();
}
exports.getByUrl = function(url, done){
	const query = 'SELECT peerId FROM host_data WHERE url = ?';
	client.query(query, url)
		.then(res => {
			console.log("GetbyUrl query completed successfully");
		})		
		.catch(e => console.error(e.stack))
}

exports.create = function(peerId, url, done){
	const query = 'INSERT INTO host_data SET peerId=$1 url=$2';
	client.query(query, [peerId, url])
		.then(res =>{
			console.log("Create query completed successfully");
		})
		.catch(e => console.error(e.stack))
}