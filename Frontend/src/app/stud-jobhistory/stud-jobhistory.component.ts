import { Component, OnInit } from '@angular/core';
import { StudAuthService } from '../stud-auth.service';

@Component({
  selector: 'app-stud-jobhistory',
  templateUrl: './stud-jobhistory.component.html',
  styleUrls: ['./stud-jobhistory.component.css']
})
export class StudJobhistoryComponent implements OnInit {

  constructor(private history:StudAuthService) { }

  ngOnInit(): void {
    let id = localStorage.getItem("stud-id")
    this.history.job_history(id).subscribe((data)=>{
        console.log("in stud-jobhistory component :",data)
    })
  }
  

}
