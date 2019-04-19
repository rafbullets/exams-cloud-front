import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-file-dialog',
  templateUrl: './upload-file-dialog.component.html',
  styleUrls: ['./upload-file-dialog.component.css']
})
export class UploadFileDialogComponent implements OnInit {

  files
  isArchive = false
  archiveName = ''

  constructor() { }

  ngOnInit() {
  }

  handleFileInput(files) {
    this.files = files
  }

  handleClose(): any {
    return {files: this.files, isArchive: this.isArchive, archiveName: this.archiveName}
  }

}
