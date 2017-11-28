import { Injectable } from '@angular/core';

@Injectable()
export class FileService {

  file: File;

  constructor() { }

  setFile(file: File) {
    this.file = file;
  }

  getFile(): File {
    return this.file;
  }

}
