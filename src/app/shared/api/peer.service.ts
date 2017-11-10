import { Injectable } from '@angular/core';

@Injectable()
export class PeerService {

    file: File;
	peer: any;
	peerId: any;

	constructor() {
	// Replace '<key>' with actual key in prod, if there is anything other than '<key>' in this
	// field please let me know Kellen
	this.peer = new Peer({ key: '<key>' });
		setTimeout(() => {
			this.peerId = this.peer.id;
			console.log("PeerId:" + this.peer.id);
		}, 3000);
		this.peer.on('connection', function (conn) {
			conn.on('data', function (data) {
				console.log(data);
			});
		});
	}
	getPeerId(): any{
		console.log("PeerId:" + this.peerId);
		return this.peerId;
	}
	
	// We only want this service to be able to initiate a connection with a remote peer
	private connectToPeer(remotePeerId: any) {
		var dataConn = this.peer.connect(remotePeerId);
		console.log("Connecting to peer placeholder");
	}
	
	// SQL server will have a table with two columns: {url}|{peerID}
	createUrl(){
		console.log("Creating url placeholder");
		// Can be replaced with a more human-readable extension in the future
		var urlext = this.generateUrlCode();
		console.log(this.peerId + ":" + urlext);
		return urlext;
	}

	generateUrlCode() {
		var code = "";
		var keyspace = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	  
		for (var i = 0; i < 3; i++)
		  code += keyspace.charAt(Math.floor(Math.random() * keyspace.length));
	  
		// reutrn Math.random().toString(36).substr(2,5);
		return code;
	  }

}
