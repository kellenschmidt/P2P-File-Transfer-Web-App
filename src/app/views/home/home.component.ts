import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  placeholderText: string = ""
  valueText: string = ""

  handleFileSelection(event) {
    alert(event);
    this.placeholderText = "Selected file";
    this.valueText = event;
  }

  constructor() { }

  ngOnInit() {
  }

}
