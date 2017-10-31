import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http'
// import {bootstrap} from '@angular/platform-browser-dynamic';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { FileValidators } from './file-validators';

import 'rxjs/add/operator/map'

@Component({
  selector: 'material-app',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.css'],
})
export class App1Component implements OnInit {
  
  private version: any;
  formDoc: FormGroup;
  
  constructor(http: Http, private _fb: FormBuilder) {
    // Display the currently used Material 2 version.
    this.version = http
      .get('https://api.github.com/repos/angular/material2-builds/commits/HEAD')
      .map(res => res.json())
  }
  
  ngOnInit() {
    this.formDoc = this._fb.group({
      basicfile: [],
      requiredfile: [{ value: undefined, disabled: false }, [Validators.required, FileValidators.maxContentSize(104857600)]],
      disabledfile: [{ value: undefined, disabled: true }],
      multiplefile: [{ value: undefined, disabled: false }],
    });
  }
  
  onSubmit() {
    console.log('SUBMITTED', this.formDoc);
  }
  
}

/*
  Copyright 2017 Google LLC. All Rights Reserved.
  Use of this source code is governed by an MIT-style license that
  can be found in the LICENSE file at http://angular.io/license
 */