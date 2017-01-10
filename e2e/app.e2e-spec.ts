import { KendoAngular2UploadSampleAppPage } from './app.po';

describe('kendo-angular2-upload-sample-app App', function() {
  let page: KendoAngular2UploadSampleAppPage;

  beforeEach(() => {
    page = new KendoAngular2UploadSampleAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
