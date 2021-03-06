import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event/event.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.page.html',
  styleUrls: ['./event-list.page.scss'],
})
export class EventListPage implements OnInit {

  public eventList: Array<any>;
  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.eventService
        .getEventList()
        .get()
        .then(eventListSnapshot => {
          this.eventList = [];
          eventListSnapshot.forEach(snap => {
            this.eventList.push({
              id: snap.id,
              schedule: snap.data().schedule,
              scheduleCat: snap.data().scheduleCat,
              startDate: snap.data().startDate,
              endDate: snap.data().endDate,
            });
            return false;
          });
        });
  }

  

  removeEvent(id){
    this.eventList.splice(id);
    this.eventService.removeEvent(id)
  }

}
