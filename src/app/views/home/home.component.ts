import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { PeerService } from '../../shared/api/peer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	constructor(private peerService: PeerService, private route: ActivatedRoute) { }

	ngOnInit() {
	}
	getPeerId(){
		this.peerId = this.peerService.getPeerId();
	}
	createUrl(){
		this.peerService.createUrl();
	}
	initConn(remotePeerId: any){
		this.peerService.initConn(remotePeerId);
	}
}
