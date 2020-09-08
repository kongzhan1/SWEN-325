import {Injectable} from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  // collection of the events
  public eventListRef: firebase.firestore.CollectionReference;

  constructor() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.eventListRef = firebase
            .firestore()
            .collection(`/userProfile/${user.uid}/eventList`);
      }
    });
  }

  // createEvent is for creating an event and put it into the event list.
  createEvent(
      scheduleCat: string,
      schedule: string,
      startDate: number,
      endDate: number
  ): Promise<firebase.firestore.DocumentReference> {
    return this.eventListRef.add({
      scheduleCat: scheduleCat,
      schedule: schedule,
      startDate: startDate,
      endDate: endDate,
    });
  }

  removeEvent(id) {
    return this.eventListRef.doc(id).delete();
  }
  // getEventList is for getting the current event list.
  getEventList(): firebase.firestore.CollectionReference {
    return this.eventListRef;
  }

  // getting the single event
  getEventDetail(eventId: string): firebase.firestore.DocumentReference {
    return this.eventListRef.doc(eventId);
  }



}
