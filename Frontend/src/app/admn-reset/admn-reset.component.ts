import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdmnAuthService } from '../admn-auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admn-reset',
  templateUrl: './admn-reset.component.html',
  styleUrls: ['./admn-reset.component.css']
})
export class AdmnResetComponent implements OnInit {
  admnID='';
  constructor(
    private admn:AdmnAuthService,
    private router:Router,
    private http:HttpClient
  ) { }

  ngOnInit(): void {
    let admnID=localStorage.getItem("editPwd")
    alert(admnID)
  }
  resetAdmin(){
     //this.admn.editAdmin(this.admnID).subscribe(()=>{

    //})
  }

}
