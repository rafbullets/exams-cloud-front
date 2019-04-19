import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { FileExplorerComponent } from './file-explorer/file-explorer.component';
import { NewFolderDialogComponent } from './modals/new-folder-dialog/new-folder-dialog.component';
import { RenameDialogComponent } from './modals/rename-dialog/rename-dialog.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UploadFileDialogComponent } from './modals/upload-file-dialog/upload-file-dialog.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { GenerateLinkComponent } from './modals/generate-link/generate-link.component';

@NgModule({
  declarations: [FileExplorerComponent, NewFolderDialogComponent, RenameDialogComponent, UploadFileDialogComponent, GenerateLinkComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatIconModule,
    MatGridListModule,
    MatMenuModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    MatTooltipModule,
    MatCheckboxModule,
  ],
  exports: [FileExplorerComponent],
  entryComponents: [ NewFolderDialogComponent, RenameDialogComponent, UploadFileDialogComponent, GenerateLinkComponent]
})
export class FileExplorerModule { }
