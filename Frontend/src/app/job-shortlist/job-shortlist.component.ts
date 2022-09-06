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

  // ************************query3
  // sel_skills = JSON.stringify(['express','react','mongodb'])
  // readonly params = new HttpParams()
  // .set('jobId','6310e2fca086dd21ce2f2a0e')

  // ************************query3

   // ************************query4
  // readonly params = new HttpParams()
  // .set('jobId','6310e2fca086dd21ce2f2a0e')
  // .set ( 'yop', 2017)
  // .set('course','Cyber Security Analyst')

  // ************************query4
   // ************************query5
  // readonly params = new HttpParams()
  // .set('jobId','6310e2fca086dd21ce2f2a0e')
  // .set ( 'yop', 2017)

  // ************************query5

  // ************************query6
  // readonly params = new HttpParams()
  // .set('jobId','6310e2fca086dd21ce2f2a0e')
  // .set('course','Cyber Security Analyst')

  // ************************query6

  // ************************query7
  readonly params = new HttpParams()
  .set('jobId','6310e2fca086dd21ce2f2a0e')
  .set ( 'yop', 2017)
  .set('course','Cyber Security Analyst')


  // ************************query7


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

    //*********************query3 */
    // console.log("params is",this.params)
    // this.jobService.skill_shortlist(this.params).subscribe((data:any)=>{
    // console.log("shortlisted", data)
    // })

    //*********************query3 */

    //*********************query4 */
    // console.log("params is",this.params)
    // this.jobService.cy_shortlist(this.params).subscribe((data:any)=>{
    // console.log("shortlisted", data)
    // })

    //*********************query4 */

    //*********************query5 */
    // console.log("params is",this.params)
    // this.jobService.ys_shortlist(this.params).subscribe((data:any)=>{
    // console.log("shortlisted", data)
    // })

    //*********************query5 */

    //*********************query6 */
    // console.log("params is",this.params)
    // this.jobService.sc_shortlist(this.params).subscribe((data:any)=>{
    // console.log("shortlisted", data)
    // })

    //*********************query6 */

    //*********************query7 */
    console.log("params is",this.params)
    this.jobService.ysc_shortlist(this.params).subscribe((data:any)=>{
    console.log("shortlisted", data)
    })

    //*********************query7 */
}
}
