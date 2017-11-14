import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PeerService } from '../../shared/api/peer.service';

@Component({
  selector: 'app-file-download',
  templateUrl: './file-download.component.html',
  styleUrls: ['./file-download.component.scss']
})
export class FileDownloadComponent implements OnInit {
	url: string;
	
	constructor(private router: Router, private route: ActivatedRoute, private peerService: PeerService) { 
		this.url = route.snapshot.url[0].path;
	}
	ngOnInit() { }
	
	requestConnection(url: string){
		// Request to connect, then get peerId from db
		//var connection = this.initConn('<remotePeerId>')
	}
	private initConn(remotePeerId: any){
		this.peerService.initConn(remotePeerId);
	}
}
