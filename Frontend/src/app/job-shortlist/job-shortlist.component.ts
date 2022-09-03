import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { JobService } from '../job.service';

@Component({
  selector: 'app-job-shortlist',
  templateUrl: './job-shortlist.component.html',
  styleUrls: ['./job-shortlist.component.css']
})
export class JobShortlistComponent implements OnInit {

  constructor(private jobService: JobService) { }

  // *********************query1
  // readonly params = new HttpParams()
  // .set ('jobId','6310e2fca086dd21ce2f2a0e')
  // .set ( 'yop', 2017)
  //******************* Query1

  // ************************query2
    //  readonly params = new HttpParams()
     
    //  .set('jobId','6310e2fca086dd21ce2f2a0e')
    //  .set('course','Cyber Security Analyst')
  // ************************query2

  ngOnInit(): void {
    // *******************query1
    // console.log("params is",this.params)
    // this.jobService.year_shortlist(this.params).subscribe((data:any)=>{
    //   // this.EmpProf = JSON.parse(JSON.stringify(data));
    //     console.log("shortlisted", data)
    // })
    //******************* query1
    
    //*********************query2 */
      // console.log("params is",this.params)
      // this.jobService.course_shortlist(this.params).subscribe((data:any)=>{
      // console.log("shortlisted", data)
      // })
    //*********************query2 */
}
}
