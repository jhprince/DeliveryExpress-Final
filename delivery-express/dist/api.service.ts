import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  postRetailer(data : any){
    return this.http.post<any>("http://localhost:3000/posts" , data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  getRetailer(data : any){
    return this.http.get<any>("http://localhost:3000/posts")
    
    .pipe(map((res:any)=>{
      return res;
    }))
}
updateRetailer(data : any){
  return this.http.put<any>("http://localhost:3000/posts",data)
  .pipe(map((res:any)=>{
    return res;
  }))
}
deleteRetailer(id : number){
  return this.http.delete<any>("http://localhost:3000/posts"+id)
  .pipe(map((res:any)=>{
    return res;
  }))
}

}