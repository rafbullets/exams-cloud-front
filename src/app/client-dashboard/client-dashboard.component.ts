import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FileExplorerComponent } from '../file-explorer/file-explorer/file-explorer.component';
import { FileExplorerService } from '../file-explorer/file-explorer.service';

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.css']
})
export class ClientDashboardComponent implements OnInit {

  firstName = ''
  lastName = ''
  indexNo = ''
  group = ''
  url = ''
  groups = []
  selectedGroup
  file

  constructor(private service: FileExplorerService) { }

  ngOnInit() {
  }

  getGroups() {
    this.service.listFilesFromUrl(this.url).subscribe( data => {
      this.groups = data;
    })
  }
  onGroupSelect(event) {
    this.selectedGroup = event.value;
  }

  downloadFile() {
    if (this.selectedGroup) {
      this.service.download(this.selectedGroup.name, this.selectedGroup.path);
    }
  }

  handleFileInput(file) {
    this.file = file[0]
  }

  uploadFile(){
    if (this.file) {
      let student = {
        firstName: this.firstName,
        lastName: this.lastName,
        indexNo: this.indexNo,
        group: this.selectedGroup.name,
      }
      this.service.uploadToUrl(this.file, this.url, student).subscribe(res => {
        console.log(res)
      })
    }
  }
}
