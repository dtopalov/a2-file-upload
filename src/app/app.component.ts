import { Component } from '@angular/core';
import { FileInfo, FileRestrictions } from '@progress/kendo-angular-upload';
import { Headers } from '@angular/http';
import { FileUploadService } from './services/file-upload.service';

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

  constructor(private fileUploadService: FileUploadService) { }

  save(value: any, valid: boolean) {
    if (valid) {
      let file = this.userImages[0];
      let postData = { name: 'name' }; // Put your form data variable. This is only example.
      this.fileUploadService.postWithFile(
        this.uploadSaveUrl,
        postData,
        [file.rawFile])
        .then(result => {
          console.log(result);
        });
    }
  }
}
