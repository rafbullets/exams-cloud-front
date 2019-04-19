import { Component, OnInit, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material';
import { FileExplorerService } from '../../file-explorer.service';

@Component({
  selector: 'app-generate-link',
  templateUrl: './generate-link.component.html',
  styleUrls: ['./generate-link.component.css']
})
export class GenerateLinkComponent implements OnInit {

  link = ''

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private service: FileExplorerService) {}

  ngOnInit() {
    console.log(this.data)
  }

  onGenerateUploadPath(event) {
    this.service.generateLink((this.data.element.path.endsWith('/') && this.data.element.name ? this.data.element.path  + this.data.element.name: this.data.element.path +'/' + this.data.element.name ), event).subscribe(data => {
      this.link = data.encryptedUri;
      console.log(data);
    })
  }

}
