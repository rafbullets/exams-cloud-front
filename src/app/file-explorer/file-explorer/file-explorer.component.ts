import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FileElement } from '../model/file-element';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { RenameDialogComponent } from '../modals/rename-dialog/rename-dialog.component';
import { NewFolderDialogComponent } from '../modals/new-folder-dialog/new-folder-dialog.component';
import { FileExplorerService } from '../file-explorer.service';

@Component({
  selector: 'file-explorer',
  templateUrl: './file-explorer.component.html',
  styleUrls: ['./file-explorer.component.css']
})
export class FileExplorerComponent {
  fileElements: FileElement[];
  canNavigateUp = false;
  path = '/';

  constructor(public dialog: MatDialog, private service: FileExplorerService) {
    this.service.getForPath(this.path).subscribe(data => {
      this.fileElements = data;
    });
  }

  deleteElement(element: FileElement) {
    this.service.delete(element.name, element.path).subscribe(data => {
      console.log(data);
    });
    this.fileElements.splice(this.fileElements.indexOf(element), 1);
  }

  navigate(element: FileElement) {
    if (element.fileType === 'FOLDER') {
      const newPath = this.path + (this.path.endsWith('/') ? '' : '/') + element.name;
      this.service.getForPath(newPath).subscribe(data => {
        this.fileElements = data;
      })
      this.path = newPath;
      this.canNavigateUp = true;
    }
  }

  navigateUp() {
    if (this.path !== '/') {
      var newPath = this.path.substring(0, this.path.lastIndexOf('/'));
      if (newPath === '') {
        newPath = '/'
      }
      this.service.getForPath(newPath).subscribe(data => {
        this.fileElements = data;
      });
      if (newPath === '/') {
        this.canNavigateUp = false;
      }
      this.path = newPath;
    }
  }

  moveElement(element: FileElement, moveTo: FileElement) {
    // this.elementMoved.emit({ element: element, moveTo: moveTo });
  }

  openNewFolderDialog() {
    let dialogRef = this.dialog.open(NewFolderDialogComponent);
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.service.newFolder(res, this.path).subscribe( data => {
          this.fileElements.push(data);
        });
      }
    });
  }
  
  openRenameDialog(element: FileElement) {
    let dialogRef = this.dialog.open(RenameDialogComponent);
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.service.rename(res, element.name, this.path).subscribe( data => {
          console.log(data);
        });
        element.name = res;
      }
    });
  }
  

  openMenu(event: MouseEvent, element: FileElement, viewChild: MatMenuTrigger) {
    event.preventDefault();
    viewChild.openMenu();
  }
}

