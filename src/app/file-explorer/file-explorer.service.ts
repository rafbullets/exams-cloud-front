import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FileElement } from './model/file-element';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileExplorerService {

  filesUrl = 'files';
  folderUrl = 'files/folder';
  renameUrl = 'files/rename';

  constructor(private http: HttpClient) { }

  getForPath(path: string) {
    const params = new HttpParams().set("path", path);
    return this.http.get<FileElement[]>(environment.db + this.filesUrl, {params: params});
  }

  delete(name: string, path:string) {
    var params = new HttpParams().set("name", name).set("path", path);
    return this.http.delete<any>(environment.db + this.filesUrl, {params: params});
  }

  newFolder(name: string, path:string) {
    var params = new HttpParams().set("name", name).set("path", path);
    return this.http.post<FileElement>(environment.db + this.folderUrl, {params: params});
  }

  rename(new_name: string, old_name:string, path: string) {
    var params = new HttpParams().set("new_name", name).set("old_name", old_name).set("path", path);
    return this.http.post<any>(environment.db + this.renameUrl, {params: params});
  }
}
