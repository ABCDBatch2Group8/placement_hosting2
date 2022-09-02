import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdmnAuthService } from '../admn-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admn-subadmn',
  templateUrl: './admn-subadmn.component.html',
  styleUrls: ['./admn-subadmn.component.css']
})
export class AdmnSubadmnComponent implements OnInit {

  email!:string;
  password!:string;
  admin={
    email:'',
    password:''
  }
  constructor(private admn:AdmnAuthService,private router:Router) { }

  ngOnInit(): void {
  }
  subAdmin(){
    alert(this.admin.email)
    const newadmin={
      email:this.admin.email,
      password:this.admin.password
    }
    this.admn.newAdmin(newadmin);
    this.router.navigate(['admin/adminlist'])
  }
  
  onReset(form: NgForm): void {
    form.reset();
  }

}
