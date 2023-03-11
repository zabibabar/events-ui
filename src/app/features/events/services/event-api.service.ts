import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Event } from '../interfaces/event'
import { Attendee } from '../interfaces/attendee'

type EventCreatedto = Omit<Event, 'id'>
type EventUpdatedto = Partial<EventCreatedto>

@Injectable({
  providedIn: 'root'
})
export class EventApiService {
  constructor(private httpClient: HttpClient) {}

  getAllEvents(): Observable<Event[]> {
    return this.httpClient.get<Event[]>('/events')
  }

  getEventsByUser(userId: string): Observable<Event[]> {
    return this.httpClient.get<Event[]>(`/users/${userId}/events`)
  }

  createEvent(Event: EventCreatedto): Observable<Event> {
    return this.httpClient.post<Event>('/events', Event)
  }

  getEvent(eventId: string): Observable<Event> {
    return this.httpClient.get<Event>(`/events/${eventId}`)
  }

  updateEvent(eventId: string, EventUpdates: EventUpdatedto): Observable<Event> {
    return this.httpClient.put<Event>(`/events/${eventId}`, EventUpdates)
  }

  deleteEvent(eventId: string): Observable<void> {
    return this.httpClient.delete<void>(`/events/${eventId}`)
  }

  getEventAttendees(eventId: string): Observable<Attendee[]> {
    return this.httpClient.get<Attendee[]>(`/events/${eventId}/attendees`)
  }

  addEventAttendees(eventId: string, attendeeIds: string[]): Observable<Attendee[]> {
    return this.httpClient.post<Attendee[]>(`/events/${eventId}/attendees`, attendeeIds)
  }

  removeEventAttendee(eventId: string, attendeeIds: string[]): Observable<void> {
    return this.httpClient.delete<void>(`/events/${eventId}/attendees`, { body: attendeeIds })
  }
}
