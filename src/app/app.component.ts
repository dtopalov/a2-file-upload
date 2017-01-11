import { Component } from '@angular/core';
import { FileInfo, FileRestrictions } from '@progress/kendo-angular-upload';
import { Headers } from '@angular/http';
import { FormUploadService } from './services/';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  uploadSaveUrl: string = '/api/file';
  uploadRemoveUrl: string = 'removeUrl';

  public myRestrictions: FileRestrictions = {
    allowedExtensions: ['jpg', 'jpeg', 'png']
  };

  public userName: string;
  public userImages: Array<FileInfo>;

  constructor(private formUploadService: FormUploadService) { }

  save(value: any, valid: boolean) {
    if (valid) {
      let file = this.userImages[0];
      let postData = {
        userName: this.userName,
        fileUid: file.uid,
        fileName: file.name
       };

      this.formUploadService.postWithFile(
        this.uploadSaveUrl,
        postData,
        [file.rawFile])
        .then(result => {
          console.log(result);
        });
    }
  }
}
