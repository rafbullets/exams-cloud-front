import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FileElement } from '../model/file-element';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { RenameDialogComponent } from '../modals/rename-dialog/rename-dialog.component';
import { NewFolderDialogComponent } from '../modals/new-folder-dialog/new-folder-dialog.component';
import { FileExplorerService } from '../file-explorer.service';
import { UploadFileDialogComponent } from '../modals/upload-file-dialog/upload-file-dialog.component';
import { SelectionModel } from '@angular/cdk/collections';
import { GenerateLinkComponent } from '../modals/generate-link/generate-link.component';

@Component({
  selector: 'file-explorer',
  templateUrl: './file-explorer.component.html',
  styleUrls: ['./file-explorer.component.css']
})
export class FileExplorerComponent {
  fileElements: FileElement[];
  selectionModel: FileElement[] = [];
  canNavigateUp = false;
  path = '/';

  @Input()
  isSimple: boolean
  @Output()
  generateUploadPath = new EventEmitter<string>()
  // mouse handle
  isSingleClick: Boolean = true;

  constructor(public dialog: MatDialog, private service: FileExplorerService) {
    this.service.getForPath(this.path).subscribe(data => {
      this.fileElements = data;
      if (!this.isSimple) {
       this.fileElements = this.fileElements.filter(element => element.fileType === 'FOLDER');
      }  
    }); 
  }

  deleteElement(element: FileElement) {
    this.service.delete(element.name, element.path).subscribe(data => {
      console.log(data);
    });
    this.fileElements.splice(this.fileElements.indexOf(element), 1);
  }

  navigate(element: FileElement) {
    this.isSingleClick = false;
    if (element.fileType === 'FOLDER') {
      const newPath = this.path + (this.path.endsWith('/') ? '' : '/') + element.name;
      this.service.getForPath(newPath).subscribe(data => {
        this.fileElements = data;
        if (!this.isSimple) {
          this.fileElements = this.fileElements.filter(element => element.fileType === 'FOLDER');
         } 
      })
      this.path = newPath;
      this.canNavigateUp = true;
      this.selectionModel = []
    }
  }

  select(element: FileElement) {
    this.isSingleClick = true;
    setTimeout(() => {
      if (!this.isSingleClick) {
        return;
      }
    }, 250);
    if (this.selectionModel.includes(element)) {
      this.selectionModel.splice(this.selectionModel.indexOf(element), 1);
    } else  {
      if (!this.isSimple) {
        this.selectionModel = []
      }
      this.selectionModel.push(element);
      
    }
  }

  deselect = () => {
    this.selectionModel = [];
  }


  navigateUp() {
    if (this.path !== '/') {
      var newPath = this.path.substring(0, this.path.lastIndexOf('/'));
      if (newPath === '') {
        newPath = '/'
      }
      this.service.getForPath(newPath).subscribe(data => {
        this.fileElements = data;
        if (!this.isSimple) {
          this.fileElements = this.fileElements.filter(element => element.fileType === 'FOLDER');
         } 
      });
      if (newPath === '/') {
        this.canNavigateUp = false;
      }
      this.path = newPath;
      this.selectionModel = []
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
    if (!this.selectionModel.includes(element))
      this.selectionModel.push(element)
  }

  openUploadDialog() {
    let dialogRef = this.dialog.open(UploadFileDialogComponent);
    dialogRef.afterClosed().subscribe(res => {
      this.service.upload(res.files, this.path, res.isArchive, res.archiveName).subscribe(res => {
        this.service.getForPath(this.path).subscribe(data => {
          this.fileElements = data
          if (!this.isSimple) {
            this.fileElements = this.fileElements.filter(element => element.fileType === 'FOLDER');
           } 
        })
      })
    })
  }

  openGenerateLinkDialog(element) {
    this.dialog.open(GenerateLinkComponent, {
      width: '800px',
      height: '800px',
      data: {element: element}

    });
  }

  isSelected(element: FileElement) {
    if(this.selectionModel.includes(element)) {
      return true;
    } else {
      return false;
    }
  }

  download(element: FileElement) {
    for (let i = 0; i < this.selectionModel.length; i++)
      this.service.download(this.selectionModel[i].name, this.selectionModel[i].path)
  }

  selectUploadPath() {
    this.generateUploadPath.emit((this.path.endsWith('/') ? this.path : this.path + '/') + (this.selectionModel.length === 1 ? this.selectionModel[0].name : ''));
  }
}

