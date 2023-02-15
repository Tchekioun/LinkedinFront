import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {
  onSignOut() {
    console.log('Im signing out');
    this.authService.logout();
  }
  constructor(
    private popoverController: PopoverController,
    private authService: AuthService
  ) {}

  ngOnInit() {}
}
