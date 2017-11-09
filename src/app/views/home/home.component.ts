import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PeerService } from '../../shared/api/peer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	peerId: any;
	
	constructor(private peerService: PeerService) { }

	ngOnInit() {
	}
	getPeerId(){
		this.peerId = this.peerService.getPeerId();
	}
	createUrl(){
		this.peerService.createUrl();
	}
}
