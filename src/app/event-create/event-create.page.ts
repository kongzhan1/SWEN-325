import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from 'src/app/services/event/event.service';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.page.html',
  styleUrls: ['./event-create.page.scss'],
})
export class EventCreatePage implements OnInit {

  constructor(private router: Router, private eventService: EventService, private adding: LoadingController, private toastCtrl: ToastController
   ) { }

  ngOnInit() {
  }

  createEvent(
    scheduleCat: string,
    schedule: string,
    startDate: number,
    endDate: number
  ): void {
    if (
      scheduleCat === undefined ||
      schedule === undefined ||
      startDate === undefined ||
      endDate === undefined
    ) {
      return;
    }
    this.eventService
      .createEvent(scheduleCat, schedule, startDate, endDate)
      .then(() => {
      });
  }

  async showResult() {
    let loading = await this.adding.create({
      message: "Add new schedule successfully!",

    });
    loading.present();
    setTimeout(() => {
      loading.dismiss();

    }, 1000)
  }
  checkList() {
    this.router.navigateByUrl('event-list');

  }
  async showToast() {
    let toast = await this.toastCtrl.create({
      message: 'New schedule added, click checkList to check new schedule.',
      duration: 2000,
      position: 'top'
    });
    toast.present()
  }

}
