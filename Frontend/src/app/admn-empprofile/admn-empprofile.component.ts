import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdmnEmployerService } from '../admn-employer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admn-empprofile',
  templateUrl: './admn-empprofile.component.html',
  styleUrls: ['./admn-empprofile.component.css']
})
export class AdmnEmpprofileComponent implements OnInit {

  employerview:any;
  employeredit:any;

  phoneinvalid:any;
  gstinvalid:any;
  frmerrorview:any;

  displayStyle = "none";

  constructor(private http: HttpClient, private admnemployer : AdmnEmployerService, private route : Router) { }

  ngOnInit(): void {

    // let empid = localStorage.getItem('editEmployerId');   
    let empid = localStorage.getItem('EmpId'); 
    this.admnemployer.setEmpProfile(empid).subscribe((data)=>{
    this.employerview=JSON.parse(JSON.stringify(data));
    this.employeredit = JSON.parse(JSON.stringify(data));
    //localStorage.removeItem('editEmployerId')            
    })
  }  

  updateEmployer(){
    //alert(this.employeredit._id); 
    this.phoneinvalid =''; 
    this.gstinvalid ='';
    this.frmerrorview = '';
    var permit = 1;

    var regPhone= /^((\+*)((0[ -]*)*|((91 )*))((\d{12})+|(\d{10})+))|\d{5}([- ]*)\d{6}$/;
    var regGst = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    if(!regPhone.test(this.employeredit.phone)){      
      this.phoneinvalid = "Invalid Phone No"; 
      permit = 0;         
    }

    if(!regGst.test(this.employeredit.gstin)){      
      this.gstinvalid = "Invalid GST No";
      permit = 0;           
    }

    if(permit==0){
      this.frmerrorview = "* Mandatory fields missing or invalid";
    }
    else{
      this.admnemployer.updateEmployer(this.employeredit);
      this.displayStyle = "block";   
      
    }

  }

  closePopup() {
    this.displayStyle = "none";
    this.route.navigate(['admin/employer']);
  }

}
