import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Location } from './location';
import { ApiService } from './api.service';
import { saveAs } from 'file-saver';

@Injectable()
export class PeerService {

  file: File;
  peer: any;
  peerId: string;
  remotePeerId: string;
  connection: any;
  public receivedData: Observable<any>;

  constructor(private api: ApiService) {
    this.peer = new Peer({ key: '7599wxdge79442t9' });
    setTimeout(() => {
      this.peerId = this.peer.id;
      console.log("PeerId:" + this.peerId);
    }, 1000);
    this.peer.on('connection', (conn) => {
      conn.on('data', (data) => {
        console.log(data);
        this.downloadFile(data);
        sessionStorage.setItem("peerId", data.peerId);
        sessionStorage.setItem("location", data.location);
      });
    });
  }

  downloadFile(data: Response) {
    var blob = new Blob([data[0]], { type: data[1] });
    var url = window.URL.createObjectURL(blob);
    saveAs(blob, data[2]);
  }

  getPeerId(): string {
    console.log("PeerId:" + this.peerId);
    return this.peerId;
  }

  getConnection(): any {
    return this.connection || "No connection active";
  }

  // In the future this should take the current url in as an input, and middleman the connection
  // Inputs: The remote peer ID and a JSON object with City, State, Country, lat, and long fields
  // Returns a DataConnection object
  initConn(url: string, loc: Location) {
    // Get remotePeerId from db
    this.remotePeerId = "";
    this.api.getPeerByUrl(url).subscribe(
      res => {
        this.remotePeerId = res.peerid;
        console.log("Remote peer id: " + this.remotePeerId);
        this.connection = this.connectToPeer(this.remotePeerId, loc);
      },
      err => {
        console.log(err);
      });
  }

  // We only want this service to be able to initiate a connection with a remote peer
  // Inputs: The remote peer ID and a JSON object with City, State, Country, lat, and long fields
  // Returns a DataConnection object
  private connectToPeer(remotePeerId: string, loc: Location): any {
    console.log("ConnectToPeer:\nRemotepeerId: " + remotePeerId + "\nLoc obj: " + loc + "\nLocalpeerId: " + this.peerId);
    let localPeerId = this.peerId;
    var dataConn = this.peer.connect(remotePeerId);
    dataConn.on('open', function () {
      dataConn.send(
        {
          "location": [loc.latitude, loc.longitude, loc.city, loc.state, loc.country],
          "peerId": localPeerId
        }
      );
    });
    return dataConn;
  }

  sendFile(file: File, peerid: string) {
    this.connection = this.peer.connect(peerid);
    this.connection.on('open', () => {
      this.connection.send([file, file.type, file.name]);
    });
  }
  // SQL server will have a table with two columns: {url}|{peerID}
  createUrl() {
    console.log("Generating url...");
    // Can be replaced with a more human-readable extension in the future
    var urlext = this.generateUrlCode();
    console.log(this.peerId + ":" + urlext);
    this.api.addPeer(this.peerId, urlext).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log("Error: " + err);
      }
    );
    return urlext;
  }

  generateUrlCode() {
    var code = "";
    var keyspace = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 3; i++)
      code += keyspace.charAt(Math.floor(Math.random() * keyspace.length));
    return code;
  }

}
