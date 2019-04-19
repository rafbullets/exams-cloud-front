import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FileElement } from './model/file-element';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileExplorerService {

  filesUrl = 'files'
  folderUrl = 'files/folder'
  renameUrl = 'files/rename'
  downloadUrl = 'files/download'
  uploadUrl = 'files/upload'
  generateLinkUrl = 'link'

  constructor(private http: HttpClient) { }

  getForPath(path: string) {
    const params = new HttpParams().set("path", path);
    return this.http.get<FileElement[]>(environment.db + this.filesUrl, {params: params});
  }

  delete(name: string, path:string) {
    var params = new HttpParams().set("name", name).set("path", path);
    return this.http.delete<any>(environment.db + this.filesUrl + "?" + params.toString());
  }

  newFolder(name: string, path:string) {
    var myParams = new HttpParams().append("name", name).append("path", path);
    return this.http.post<FileElement>(environment.db + this.folderUrl + "?" + myParams.toString(), {});
  }

  rename(new_name: string, old_name:string, path: string) {
    var params = new HttpParams().append("new_name", new_name).append("old_name", old_name).append("path", path);
    return this.http.post<any>(environment.db + this.renameUrl + "?" + params.toString(), {});
  }

  download(name: string, path: string) {
    const params = new HttpParams().set("name", name).set("path", path)
    window.open(environment.db + this.downloadUrl + "?" + params.toString(), '_blank');
  }

  upload(files, path, archive, archive_name) {
    // const body = {files: files, path: path, archive: archive, archive_name: archive_name};

    const body = new FormData()
    body.append('files', files[0]);
    body.append('path', path);
    body.append('archive', archive);
    body.append('archive_name', archive_name);
    
    return this.http.post<any>(environment.db + this.uploadUrl, body);
  }
  generateLink(source_path:string, upload_destination_path:string): Observable<any>{
    const params = new HttpParams().set("source_path", source_path).set('upload_destination_path', upload_destination_path);
    return this.http.get<any>(environment.db + this.generateLinkUrl, {params: params});
  }

  listFilesFromUrl(encrypted_path: string) {
    return this.http.get<FileElement[]>(encrypted_path);
  }

  uploadToUrl(file, path) {
    const data = new FormData()
    data.append('file', file)
    return this.http.post<any>(path, data)
  }
}
