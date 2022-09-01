import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  server_address: string = 'http://localhost:3000';

  constructor( private http: HttpClient) { }

  newJobs(addjob: any) {
    console.log("addemp", addjob)
    return this.http.post<any>(`${this.server_address}/job/jobpost`, { "Job": addjob })
    .subscribe(res =>{
      console.log("res is", res);
    })
    }
  getJobs(){
    return this.http.get<any>(`${this.server_address}/job/joblist`)
  }

  jobDetails(id:any){
    return this.http.get<any>(`${this.server_address}/job/jobview/`+id)
  }

  editJob(job:any){
    console.log("Job update");
    return this.http.put<any>(`${this.server_address}/job/edit/`,job)
    .subscribe(data => {console.log(data)})
  }


}


