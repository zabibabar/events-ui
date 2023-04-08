import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Event } from '../interfaces/event'
import { Attendee } from '../interfaces/attendee'
import { EventCreateDto } from '../dtos/event-create-dto'
import { EventUpdateDto } from '../dtos/event-update-dto'
import { AttendeeUpdateDto } from '../dtos/attendee-update-dto'
import { EventRequestFilterOptions } from '../interfaces/event-request-filter-options'

@Injectable({
  providedIn: 'root'
})
export class EventApiService {
  constructor(private httpClient: HttpClient) {}

  getAllEvents(filterOptions: EventRequestFilterOptions): Observable<Event[]> {
    const params = new HttpParams({ fromObject: { ...filterOptions, currentDate: new Date().toISOString() } })
    return this.httpClient.get<Event[]>('events', { params })
  }

  getEventsByGroup(groupId: string, filterOptions: EventRequestFilterOptions): Observable<Event[]> {
    const params = new HttpParams({ fromObject: { groupId, ...filterOptions, currentDate: new Date().toISOString() } })
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

  addEventAttendee(eventId: string, userId: string): Observable<Attendee[]> {
    const body = { userId, currentDate: new Date().toISOString() }
    return this.httpClient.post<Attendee[]>(`events/${eventId}/attendees/`, body)
  }

  updateEventAttendee(eventId: string, attendeeId: string, changes: AttendeeUpdateDto): Observable<Attendee[]> {
    const body = { ...changes, currentDate: new Date().toISOString() }
    return this.httpClient.patch<Attendee[]>(`events/${eventId}/attendees/${attendeeId}`, body)
  }
}
