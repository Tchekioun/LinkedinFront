import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NewUser } from '../models/newUser.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  private httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  register(newUser: NewUser): Observable<User> {
    return this.http
      .post<User>(
        `${environment.baseApiUrl}/users/register`,
        newUser,
        this.httpOptions
      )
      .pipe(take(1));
  }
}
