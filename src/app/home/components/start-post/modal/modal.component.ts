import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @ViewChild('form') from!: NgForm;

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  onDismiss() {
    this.modalController.dismiss(null, 'dismiss from X button');
  }

  onPost() {
    if (!this.from.valid) return;
    const body = this.from.value.body;
    this.modalController.dismiss(
      {
        post: {
          body,
          createdAt: new Date(),
        },
      },
      'post'
    );
  }
}
