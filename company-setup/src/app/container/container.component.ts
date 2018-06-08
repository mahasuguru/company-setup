import { Component, OnInit } from '@angular/core';
import { Container } from './container';
import { HttpClient,HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})

export class ContainerComponent implements OnInit {
  selectedFile: File;
  constructor(private http: HttpClient) {}
  states:string[] = [
    'AP',
    'TS',
    'TN',
    'KA',
    'GUJARATH',
    'MAHARASTRA',
  ];
  currencies:string[] = [
    'Australian Dollar(AUD)',
    'US Dollar',
    'Ringgit(MYR)',
    'Rupee(INR)',
    'Afghani(AFN)',
  ];

  onFileChanged(event) {
    this.selectedFile =<File> event.target.files[0]
  }
  onUpload() {
    // upload code goes here
    const fd=new FormData();
    fd.append('image',this.selectedFile,this.selectedFile.name);
    this.http.post('https://us-centrali-fb-cloud-functions-demo.cloudfunctions.net/uploadFile',fd,
      {reportProgress:true,
      observe:'events'})

      .subscribe(event => {if(event.type===HttpEventType.UploadProgress)
      {console.log('Upload Progress:'+Math.round(event.loaded/event.total*100)+'%');}
      else if(event.type===HttpEventType.Response){
        console.log(event);
      }

      });
  }
  errorMsgList: any;


  public container = new Container();

  ngOnInit() {
    this.save();
    var controller = function($scope) {

      $scope.form = {
        save: function() {
          if($scope.form.$invalid) return false;

        }
      }

    };
  }


  cancel() {

    alert('Are you Sure to Cancel Company Setup ?');
  }

  save() {
    let containerObj = this.container;
    this.errorMsgList = [];
    containerObj.company_name === '' ? this.errorMsgList.push('company Name is required.') : '';
    containerObj.company_no === '' ? this.errorMsgList.push('company_no is required') : '';
    containerObj.address === '' ? this.errorMsgList.push('address is required.') : '';
    containerObj.stateId === '' ? this.errorMsgList.push('stateId is required') : '';


    if (this.errorMsgList.length == 0) {
      alert('are u want save CompanySetupPage')
    }
    else {
      this.errorMsgList.push('field required...!')

    }
  }
}






