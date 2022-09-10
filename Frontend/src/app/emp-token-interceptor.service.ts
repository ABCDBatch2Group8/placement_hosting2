import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HTTP_INTERCEPTORS, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmpService } from './emp.service';
  
  @Injectable({
  providedIn: 'root'
})
export class EmpTokenInterceptorService {

  constructor(private injector : Injector) { }

  intercept(req:any,nxt:any) {
    let empService=this.injector.get(EmpService)
    let tokenizedReq = req.clone({
      setHeaders:{
        Authorization:`Bearer ${empService.getToken()}`
      }
    }
    )
    return nxt.handle(tokenizedReq)
  
}
}
