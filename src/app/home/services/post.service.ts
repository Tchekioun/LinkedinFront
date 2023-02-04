import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}
  httpUrl = 'http://localhost:3000';
  getSelectedPosts(params: any): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.httpUrl}/feeds${params}`);
  }
}
