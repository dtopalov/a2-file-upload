import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
declare let $: any;

@Injectable()
export class FormUploadService {
  requestUrl: string;
  handleError: any;

  constructor(private http: Http) { }

  postWithFile(url: string, postData: any, files: File[]) {
    let headers = new Headers();
    let formData: FormData = new FormData();
    formData.append('files', files[0], files[0].name);
    // For multiple files
    // for (let i = 0; i < files.length; i++) {
    //     formData.append(`files[]`, files[i], files[i].name);
    // }

    if (postData !== '' && postData !== undefined && postData !== null) {
      for (let property in postData) {
        if (postData.hasOwnProperty(property)) {
          formData.append(property, postData[property]);
        }
      }
    }

    return this.http.post('/api/file', formData, {
      headers: headers
    }).map(resp => resp.json());
  }

  postForm(url: string, postData: any) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post('/api/form', JSON.stringify(postData), {
      headers: headers
    }).map(resp => resp.json());
  }
}
