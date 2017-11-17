import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Location } from './location';

@Injectable()
export class PeerService {

  file: File;
  peer: any;
  peerId: string;
  remotePeerId: string;
  receivedData: Observable<any>;

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
        this.receivedData = Observable.of(data);
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
    this.remotePeerId = "";
    return this.connectToPeer(this.remotePeerId, loc);
  }

  // We only want this service to be able to initiate a connection with a remote peer
  // Inputs: The remote peer ID and a JSON object with City, State, Country, lat, and long fields
  // Returns a DataConnection object
  private connectToPeer(remotePeerId: string, loc: Location): any {
    var dataConn = this.peer.connect(remotePeerId);
    dataConn.on('open', function () {
      dataConn.send(
        // {
        //   "Greeting": 'Hello! You are peerId ' + remotePeerId + ', greetings from peerId ' + this.peerId,
        //   "city": loc.city,
        //   "state": loc.state,
        //   "country": loc.country,
        //   "lat": loc.latitude,
        //   "long": loc.longitude,
        // },
        [
          loc, this.peerId
        ]
      );
    });
    return dataConn;
  }

  receiveData(location: Location) {
    this.receivedData.subscribe(
      data => {
        console.log('onNext: %s', data)
        location.latitude = data[0].latitude;
        location.longitude = data[0].Location;
        location.city = data[0].city;
        location.state = data[0].state;
        location.country = data[0].country;
      },
      error => {
        console.log('onError: %s', error)
      },
      () => {
        console.log('onCompleted')
      }
    );
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

    // reutrn Math.random().toString(36).substr(2,5);
    return code;
  }

}
