import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Group } from '../interfaces/group'
import { Member } from '../interfaces/member.interface'

type GroupCreateDTO = Omit<Group, 'id'>
type GroupUpdateDTO = Partial<GroupCreateDTO>

@Injectable({
  providedIn: 'root'
})
export class GroupApiService {
  constructor(private httpClient: HttpClient) {}

  getAllGroups(): Observable<Group[]> {
    return this.httpClient.get<Group[]>('/groups')
  }

  getGroupsByUser(userId: string): Observable<Group[]> {
    return this.httpClient.get<Group[]>(`/users/${userId}/groups`)
  }

  createGroup(group: GroupCreateDTO): Observable<Group> {
    return this.httpClient.post<Group>('/groups', group)
  }

  getGroup(groupId: string): Observable<Group> {
    return this.httpClient.get<Group>(`/groups/${groupId}`)
  }

  updateGroup(groupId: string, groupUpdates: GroupUpdateDTO): Observable<Group> {
    return this.httpClient.put<Group>(`/groups/${groupId}`, groupUpdates)
  }

  deleteGroup(groupId: string): Observable<Group> {
    return this.httpClient.delete<Group>(`/groups/${groupId}`)
  }

  getGroupMembers(groupId: string): Observable<Member[]> {
    return this.httpClient.get<Member[]>(`/groups/${groupId}/members`)
  }

  addGroupMembers(groupId: string, userIds: string[]): Observable<Member[]> {
    return this.httpClient.post<Member[]>(`/groups/${groupId}/members`, userIds)
  }

  removeGroupMember(groupId: string, userId: string): Observable<void> {
    return this.httpClient.delete<void>(`/groups/${groupId}/members/${userId}`)
  }
}
