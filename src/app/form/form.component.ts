import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  
  Register:FormGroup;
  list:any =[];
  constructor(private fb:FormBuilder,private service:ServiceService,private toastr: ToastrService) {
    this.Register= this.fb.group(
      { 
        employeeName:['',Validators.required],
        employeeDeparment:['',Validators.required],
        employeeAge:['',Validators.required],
        employeeRole:['',Validators.required]
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
    this.toastr.success('Submitted successfully', 'Employee Detail Register')

  });
}
refreshList(){
this.service.onReceive().subscribe(res => {
  this.list = res;
})
}

onDelete(id){

  if(confirm('Are you sure to delete this record'))
 {
  this.service.deletePaymentDetail(id).subscribe(res=>{
  console.log(res);
  this.refreshList();
  this.toastr.error('Deleted successfully', 'Employee Detail Register')

});

 }
}

}
