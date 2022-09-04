import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class AdmnAuthService {
  stud={
    firstname:'',
    lastname:'',
    email:''
  }

  constructor(private http:HttpClient) { }
  admnlogin(admin:any){
    return this.http.post('http://localhost:3000/admin/login',admin)
  }
  newAdmin(admin:any){
    return this.http.post('http://localhost:3000/admin/signup',admin)
    .subscribe(data=>{
      console.log(data);
    })
  }
  editAdmin(){
    
  }
  newStudent(stud:any){
    
    return this.http.post('http://localhost:3000/admin/addictkstudent',stud)
    .subscribe(data=>{
      console.log(data);
    })
  }
  newCourse(course:any){
    return this.http.post('http://localhost:3000/admin/course',course)
    .subscribe(data=>{
      console.log(data);
    })
  }
  getStudent(email:any){
    return this.http.get('http://localhost:3000/admin/student',email)
    .subscribe(data=>{
      console.log(data);
    })

  }
  deleteCourse(id:any){
    
    return this.http.delete("http://localhost:3000/admin/deletecourse/"+id)
  }
  deleteStudent(id:any){
    
    return this.http.delete("http://localhost:3000/admin/deletestudent/"+id)
  }
}
