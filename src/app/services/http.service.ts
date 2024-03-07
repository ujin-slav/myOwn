import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPost } from '../models/IPost';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient){ }
      
  getData(){
      return this.http.get<IPost[]>("https://jsonplaceholder.typicode.com/comments?postId=10")
  }
  
}
