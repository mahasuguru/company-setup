import { Component, OnInit } from '@angular/core';
import { Container } from './container';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})

export class ContainerComponent implements OnInit {
  public inputHeight: String;

  errorMsgList: any;

  constructor() {
  }

  public container = new Container();

  ngOnInit() {
    console.log(this.container);
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






