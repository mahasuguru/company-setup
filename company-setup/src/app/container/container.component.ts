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





  ngOnInit() {

  }
  GetSelectedCountry(){
    alert('Are you sure?');
    let strCountry = document.getElementById("country");
  }
 lastdate($event){

   alert('Are you ok'+(this.container. yearclosing));
   this.container.startyear = new Date(this.container.yearclosing);
   //this.container.startyear = new Date(this.container.yearclosing.getDate() + 1);

   alert('Are you ok'+(this.container.startyear.toDateString()));
  /*let dd = this.container. startyear.getDate();
   alert('haii'+dd);
   let mm = this.container. startyear.getMonth()+1 ;
   alert('haii'+mm);
   let y = this.container. startyear.getFullYear();
   alert('haii'+y);
   let someFormattedDate = mm+ '/' + dd+ '/' + y;
   alert('haii'+someFormattedDate);*/
  let dd=this.container.startyear.getDate()+1;
   alert('Are you ok'+dd);

   this.container. startyear.setDate(this.container.startyear.getDate()+1).toLocaleString();

   alert('Are you ok'+(this.container. startyear));

}
  todate($event) {
    this.container.endyear = new Date(this.container.startyear );
    alert('Are you ok'+(this.container. endyear));

    this.container. endyear.setDate(this.container. endyear.getMonth()+this.container.closeperiod);
    alert('Are you ok'+(this.container. endyear));

  }
  extension($event){
    this.container.Extension = (this.container.ExtensionPeriod);
    alert('Are you ok'+(this.container. Extension));

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
alert('fields required');
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






