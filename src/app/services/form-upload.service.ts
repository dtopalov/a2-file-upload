import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
declare let $: any;

@Injectable()
export class FormUploadService {
  requestUrl: string;
  responseData: any;
  handleError: any;

  constructor(private http: Http) { }

  postWithFile (url: string, postData: any, files: File[]) {
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

    let returnResponse = new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/api/file', formData, {
        headers: headers
      }).subscribe(
          res => {
              console.log(res)
            // this.responseData = res.json();
            resolve(this.responseData);
          },
          error => {
            // this.router.navigate(['/login']);
            reject(error);
          }
      );
    });

    return returnResponse;
  }
}
