import { Component, OnInit } from '@angular/core';
import { AdmnEmployerService } from '../admn-employer.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admn-jobapplications',
  templateUrl: './admn-jobapplications.component.html',
  styleUrls: ['./admn-jobapplications.component.css']
})
export class AdmnJobapplicationsComponent implements OnInit {

  jobrefid:any;
  jobinfo:any;
  applicants:any;

  errorApplnlist  = "";

  constructor(private admnemployer : AdmnEmployerService, private actroute : ActivatedRoute, private route : Router) { }

  ngOnInit(): void {
    this.jobrefid = this.actroute.snapshot.paramMap.get('id');
    //alert(this.jobrefid);
    try 
    {
      this.admnemployer.setApplicantsList(this.jobrefid).subscribe((applndata)=>{      
      this.jobinfo = JSON.parse(JSON.stringify(applndata));
      //alert(this.jobinfo.position);
      this.applicants = JSON.parse(JSON.stringify(this.jobinfo.applicants));
      })
    }
    catch(error) {
        alert("not found");
        this.errorApplnlist = "Resources not matching";
    }
  }

}
