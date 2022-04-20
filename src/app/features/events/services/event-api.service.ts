import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Event } from '../interfaces/event'
import { Attendee } from '../interfaces/attendee'

type EventCreateDTO = Omit<Event, 'id'>
type EventUpdateDTO = Partial<EventCreateDTO>

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

  createEvent(Event: EventCreateDTO): Observable<Event> {
    return this.httpClient.post<Event>('/events', Event)
  }

  getEvent(eventId: string): Observable<Event> {
    return this.httpClient.get<Event>(`/events/${eventId}`)
  }

  updateEvent(eventId: string, EventUpdates: EventUpdateDTO): Observable<Event> {
    return this.httpClient.put<Event>(`/events/${eventId}`, EventUpdates)
  }

  deleteEvent(eventId: string): Observable<Event> {
    return this.httpClient.delete<Event>(`/events/${eventId}`)
  }

  getEventAttendees(eventId: string): Observable<Attendee[]> {
    return this.httpClient.get<Attendee[]>(`/events/${eventId}/attendees`)
  }

  addEventAttendees(eventId: string, userIds: string[]): Observable<Attendee[]> {
    return this.httpClient.post<Attendee[]>(`/events/${eventId}/attendees`, userIds)
  }

  removeEventAttendee(eventId: string, userId: string): Observable<void> {
    return this.httpClient.delete<void>(`/events/${eventId}/attendees/${userId}`)
  }
}
