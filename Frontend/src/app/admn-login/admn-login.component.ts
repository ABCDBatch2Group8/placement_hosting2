import { Component, OnInit } from '@angular/core';
import { AdmnAuthService } from '../admn-auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { HeaderService } from '../header.service';


@Component({
  selector: 'app-admn-login',
  templateUrl: './admn-login.component.html',
  styleUrls: ['./admn-login.component.css']
})
export class AdmnLoginComponent implements OnInit {

  email!:string
  password!:string

  constructor(private headservice : HeaderService,private admnauth:AdmnAuthService,private router:Router) { }

  ngOnInit(): void {
    this.headservice.setMenu("general");
  }
loginAdmin(){
  const admin={
    email:this.email,
    password:this.password
  }
  
 this.admnauth.admnlogin(admin)
 .subscribe((data:any)=>{
  if(data.success=="true"){
  
    //alert('valid');
    this.router.navigate(['admin/dashboard'])
  }
  else if(data.success=="false"){
    
    Swal.fire({
      toast: true,
      color: 'blue',
      background: 'white',
      icon: 'error',
      title: "invalid username or password",
      position: 'center',
      showConfirmButton: false,
      timer: 10000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mousecenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    this.router.navigate(['admin'])
  }
  else{
    alert("invalid email")
  }
  
 })
 }
}
 

