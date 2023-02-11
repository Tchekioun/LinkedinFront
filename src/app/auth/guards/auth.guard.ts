import { Injectable } from '@angular/core';
import { CanMatch, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable, of, switchMap, take, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanMatch {
  constructor(private authService: AuthService, private router: Router) {}
  canMatch(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.isUserLoggedIn.pipe(
      take(1),
      switchMap((isUserLoggedIn: boolean) => {
        if (isUserLoggedIn) {
          return of(isUserLoggedIn);
        } else {
          return of(false);
        }
      }),
      tap((isUserLoggedIn: boolean) => {
        if (!isUserLoggedIn) {
          this.router.navigateByUrl('/auth');
        }
        this.router.navigateByUrl('/auth');
      })
    );
  }
}
