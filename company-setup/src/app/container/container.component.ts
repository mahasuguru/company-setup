import {Component, KeyValueDiffers, OnInit} from '@angular/core';
import { Container } from './container';
import { HttpClient,HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})

export class ContainerComponent implements OnInit {


  ContainerList = [];
  errorMessage = [];
  submitted = false;
  differ;
  selectedFile: File;

  constructor(private http: HttpClient,differs: KeyValueDiffers) {this.differ = differs.find({}).create();}
  public container = new Container();
  ngDoCheck(){
    let Container = this.differ.diff(this.container);

    if(this.submitted){
      this.validate();
    }
  }
  /*
  countries = [
    {
      "name": "India",
      "id": 1
    },
    {
      "name": "Australia",
      "id": 2
    },
    {
      "name": "USA",
      "id": 3
    },
    {
      "name": "Afghanistan",
      "id": 4
    },
    {
      "name": "Malaysia",
      "id": 5
    }
  ];

  states= [
    {
      "name": "Andrapradesh",
      "id": 1,
      "countryId": 1
    },
    {
      "name": "Karnataka",
      "id": 2,
      "countryId": 1
    },
    {
      "name": "Telangana",
      "id": 3,
      "countryId": 1
    },
    {
      "name": "Tamilnadu",
      "id": 4,
      "countryId": 1
    },
    {
      "name": "Maharastra",
      "id": 5,
      "countryId": 1
    }, {
      "name": "Alabama",
      "id": 1,
      "countryId": 3
    },
    {
      "name": "Alaska",
      "id": 2,
      "countryId": 3
    },
    {
      "name": "Arizona",
      "id": 3,
      "countryId": 3
    },

  ];*/
  countries: string[] = [
    'Australia',
    'USA',
    'Malaysia',
    'India',
    'Afghanistan',
  ];

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
    var reader = new FileReader();
    reader.onload = function()
    {
      var output = document.getElementById('output_image');
       output = reader.result;
    }
    reader.readAsDataURL(event.target.files[0]);

    // this.selectedFile =<File> event.target.files[0]

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

  ngOnInit() {

  }

  GetSelectedCountry(){

    /*{
      $scope.availableStates = [];
      angular.forEach($scope.states, function (value)
      {
        if (value.countryId == $scope.country.id)
        {
          $scope.availableStates.push(value);
        }
      }*/
    let strCountry = document.getElementById("country");
  }
 lastdate($event){
   this.container.startyear = new Date(this.container.yearclosing);
   this.container. startyear.setDate(this.container.startyear.getDate()+1);
   var dd =  this.container. startyear.getDate();
   var mm =  this.container. startyear.getMonth()+1;
   var yyyy =  this.container. startyear.getFullYear();
   if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm}
   this.container. startyear = mm+'/'+dd+'/'+yyyy;

}
  todate($event) {
    this.container.endyear = new Date(this.container.startyear );
    var x=this.container.closeperiod;
     /* var thisMonth = this.container.endyear.getMonth();
    this.container.endyear.setMonth(thisMonth+x);
    alert('Are you ok'+(this.container. endyear.getMonth()));

    if(this.container.endyear.getMonth() != thisMonth+x && this.container.endyear.getMonth() != 0)
      this.container.endyear.setDate(0);
    alert('Are you ok'+(this.container. endyear));*/

    var dd =   this.container. endyear.getDate();
    var mm =   this.container. endyear.getMonth()+1;
    var yyyy =   this.container. endyear.getFullYear();
    var ModMonth = mm + Number(x);

     if(dd<10){dd='0'+dd} if(ModMonth<10){ModMonth='0'+ModMonth}
    if (ModMonth > 12)
    {
      ModMonth = ModMonth-12;
      yyyy = yyyy + 1;
    }
    this.container. endyear = ModMonth+'/'+dd+'/'+yyyy;
  }
  extension($event){
    this.container.Extension = (this.container.ExtensionPeriod);
  }
  cancel() {

    alert('Are you Sure to Cancel Company Setup ?');

  }

  save() {
    this.submitted = true;
    let isValidated = this.validate();
    let containerobj = this.container;
    if(isValidated){
      alert('Are you Sure to submitCompanySetupPage?');

        }
        else{
      alert('fields required');
    }
    }

  validate(){

    this.errorMessage = [];


    if (this.container.companyName === undefined) {
      this.errorMessage.push('Please add company Name');
    }

    if (this.container.companyNo === undefined) {
      this.errorMessage.push('Please add companyNo');
    }

    if (this.container.incdate === undefined) {
      this.errorMessage.push('Please add incdate');
    }

  if (this.container.address === undefined) {
    this.errorMessage.push('Please add address');
  }
  if (this.container.countryname === undefined) {
    this.errorMessage.push('Please select countryname');
  }

  if (this.container.state === undefined) {
    this.errorMessage.push('Please select state');
  }

  if (this.container.currency === undefined) {
    this.errorMessage.push('Please select currency');
  }

  if (this.container.GSTno === undefined) {
    this.errorMessage.push('Please add GSTno');
  }


  if (this.container.yearclosing === undefined) {
    this.errorMessage.push('Please add yearclosing');
  }

  if (this.container.startperiod === undefined) {
    this.errorMessage.push('Please add startperiod');
  }
  if (this.container.closeperiod === undefined) {
    this.errorMessage.push('Please add closeperiod');
  }

    if (this.container.startyear === undefined) {
      this.errorMessage.push('Please add yearclosing');
    }

  if(this.errorMessage.length == 0){
      this.submitted = false;
      return true;
    }else{
      return false;
    }

  }
}






