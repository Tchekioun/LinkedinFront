import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { NewUser } from './models/newUser.model';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  @ViewChild('form') form!: NgForm;
  submissionType: 'login' | 'join' = 'login';

  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit() {}

  toggleText() {
    this.submissionType = this.submissionType === 'login' ? 'join' : 'login';
  }
  onSubmit() {
    const { email, password } = this.form.value;
    if (!email || !password) return;
    if (this.submissionType === 'login') {
      return this.authService.login(email, password).subscribe(() => {
        this.router.navigateByUrl('/home');
      });
    } else if (this.submissionType === 'join') {
      const { firstName, lastName } = this.form.value;
      if (!firstName || !lastName) return;
      const newUser: NewUser = {
        firstName,
        lastName,
        email,
        password,
      };
      this.authService.register(newUser).subscribe((data) => {
        this.toggleText();
      });
    }
    return of(null);
  }
}
