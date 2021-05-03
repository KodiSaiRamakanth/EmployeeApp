import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  
  Register:FormGroup;
  list:any =[];
  constructor(private fb:FormBuilder,private service:ServiceService) {
    this.Register= this.fb.group(
      { 
        employeeName:[''],
        employeeDeparment:[''],
        employeeAge:[''],
        employeeRole:['']
      }
    )
   }

  ngOnInit(): void {

    this.service.onReceive().subscribe(res=>{
      this.list = res;
  });
}
onSUbmit(){

  this.service.postEmployeeDetail(this.Register.value).subscribe(res => {
    this.Register.reset();
    this.service.onReceive();
    this.refreshList();
   

  });
}
refreshList(){
this.service.onReceive().subscribe(res => {
  this.list = res;
})
}

onDelete(id){
this.service.deletePaymentDetail(id).subscribe(res=>{
  console.log(res);
  this.refreshList();
});


}

}
