import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class AdmnAuthService {
  server_address: string = '/api';
  stud={
    firstname:'',
    lastname:'',
    email:''
  }

  constructor(private http:HttpClient) { }
  admnlogin(admin:any){
    return this.http.post(`${this.server_address}/admin/login`,admin)
  }
  newAdmin(admin:any){
    return this.http.post(`${this.server_address}/admin/signup`,admin)
    .subscribe(data=>{
      console.log(data);
    })
  }
  editAdmin(){
    
  }
  newStudent(stud:any){
    
    return this.http.post(`${this.server_address}/admin/addictkstudent`,stud)
    .subscribe(data=>{
      console.log(data);
    })
  }
  newCourse(course:any){
    return this.http.post(`${this.server_address}/admin/course`,course)
    .subscribe(data=>{
      console.log(data);
    })
  }
  getStudent(email:any){
    return this.http.get(`${this.server_address}/admin/student`,email)
    .subscribe(data=>{
      console.log(data);
    })

  }
  deleteCourse(id:any){
    
    return this.http.delete(`${this.server_address}/admin/deletecourse/`+id)
  }
  deleteStudent(id:any){
    
    return this.http.delete(`${this.server_address}/admin/deletestudent/`+id)
  }
}
