import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Event } from '../interfaces/event'
import { Attendee } from '../interfaces/attendee'
import { EventCreateDto } from '../dtos/event-create-dto'
import { EventUpdateDto } from '../dtos/event-update-dto'
import { AttendeeUpdateDto } from '../dtos/attendee-update-dto'

@Injectable({
  providedIn: 'root'
})
export class EventApiService {
  constructor(private httpClient: HttpClient) {}

  getAllEvents(): Observable<Event[]> {
    return this.httpClient.get<Event[]>('events')
  }

  getEventsByGroup(groupId: string): Observable<Event[]> {
    const params = new HttpParams({ fromObject: { groupId } })
    return this.httpClient.get<Event[]>(`events/`, { params })
  }

  getEventById(eventId: string): Observable<Event> {
    return this.httpClient.get<Event>(`events/${eventId}`)
  }

  createEvent(Event: EventCreateDto): Observable<Event> {
    return this.httpClient.post<Event>('events', Event)
  }

  getEvent(eventId: string): Observable<Event> {
    return this.httpClient.get<Event>(`events/${eventId}`)
  }

  updateEvent(eventId: string, EventUpdates: EventUpdateDto): Observable<Event> {
    return this.httpClient.patch<Event>(`events/${eventId}`, EventUpdates)
  }

  deleteEvent(eventId: string): Observable<void> {
    return this.httpClient.delete<void>(`events/${eventId}`)
  }

  uploadEventPicture(eventId: string, image: File): Observable<string> {
    const formData = new FormData()
    formData.append('event_picture', image)
    return this.httpClient.post(`events/${eventId}/uploadPicture`, formData, { responseType: 'text' })
  }

  getEventAttendees(eventId: string): Observable<Attendee[]> {
    return this.httpClient.get<Attendee[]>(`events/${eventId}/attendees`)
  }

  updateEventAttendee(eventId: string, update: AttendeeUpdateDto): Observable<Attendee[]> {
    return this.httpClient.put<Attendee[]>(`events/${eventId}/attendees`, update)
  }
}
