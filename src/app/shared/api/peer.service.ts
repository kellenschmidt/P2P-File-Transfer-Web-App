import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Location } from './location';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class PeerService {

  file: File;
  peer: any;
  peerId: string;
  remotePeerId: string;
  myObservable: Observable<any>;

  constructor() {
    this.peer = new Peer({ key: '7599wxdge79442t9' });
    this.myObservable = new Subject();

    setTimeout(() => {
      this.peerId = this.peer.id;
      console.log("PeerId:" + this.peer.id);
    }, 3000);

    this.peer.on('connection', function (conn) {
      conn.on('data', function (data) {
        this.myObservable.next(data);
      });
    });
  }

  getPeerId(): string {
    console.log("PeerId:" + this.peerId);
    return this.peerId;
  }

  // In the future this should take the current url in as an input, and middleman the connection
  // Inputs: The remote peer ID and a JSON object with City, State, Country, lat, and long fields
  // Returns a DataConnection object
  initConn(url: string, loc: Location): any {
    // Get remotePeerId from db
    this.remotePeerId = "wva0po9r4sg1ow29";
    return this.connectToPeer(this.remotePeerId, loc);
  }

  // We only want this service to be able to initiate a connection with a remote peer
  // Inputs: The remote peer ID and a JSON object with City, State, Country, lat, and long fields
  // Returns a DataConnection object
  private connectToPeer(remotePeerId: string, loc: Location): any {
    var dataConn = this.peer.connect(remotePeerId);
    dataConn.on('open', function () {
      dataConn.send(
        {
          "location": loc,
          "peerId": this.peerId
        }
      );
    });
    return dataConn;
  }

  // SQL server will have a table with two columns: {url}|{peerID}
  createUrl() {
    console.log("Generating url...");
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

    // return Math.random().toString(36).substr(2,5);
    return code;
  }

}
