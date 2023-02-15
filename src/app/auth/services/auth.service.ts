import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GetResult, Preferences } from '@capacitor/preferences';
import jwtDecode from 'jwt-decode';
import {
  BehaviorSubject,
  from,
  map,
  Observable,
  of,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { environment } from 'src/environments/environment';
import { NewUser } from '../models/newUser.model';
import { Role, User } from '../models/user.model';
import { UserResponse } from '../models/userResponse.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user$ = new BehaviorSubject<User | null>(null);

  get isUserLoggedIn(): Observable<boolean> {
    return this.user$.asObservable().pipe(
      switchMap((user: User | null) => {
        const isUserAuthenticated = user !== null;
        return of(isUserAuthenticated);
      })
    );
  }

  get userRole(): Observable<Role> {
    return this.user$.asObservable().pipe(
      switchMap((user: User | null) => {
        return of(user!.role);
      })
    );
  }

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

  login(email: string, password: string): Observable<{ access_token: string }> {
    return this.http
      .post<{ access_token: string }>(
        `${environment.baseApiUrl}/auth/login`,
        { email, password },
        this.httpOptions
      )
      .pipe(
        take(1),
        tap((response: { access_token: string }) => {
          Preferences.set({ key: 'token', value: response.access_token });
          const decodedToken: UserResponse = jwtDecode(response.access_token);
          this.user$.next(decodedToken.user);
          console.log(decodedToken);
        })
      );
  }

  isTokenInStorage(): Observable<boolean | null | undefined> {
    return from(
      Preferences.get({
        key: 'token',
      })
    ).pipe(
      map((data: GetResult) => {
        if (!data || !data.value) return null;
        const decodedToken: UserResponse = jwtDecode(data.value);
        const jwtExp = decodedToken.exp * 1000;
        const isExpired = new Date() > new Date(jwtExp);
        if (isExpired) return null;
        if (decodedToken.user) {
          this.user$.next(decodedToken.user);
          return true;
        }
      })
    );
  }

  logout(): void {
    this.user$.next(null);
    Preferences.remove({ key: 'token' });
    this.router.navigateByUrl('/auth');
  }
}
