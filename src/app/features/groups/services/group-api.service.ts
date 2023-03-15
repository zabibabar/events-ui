import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Group } from '../interfaces/group'
import { Member } from '../interfaces/member'
import { GroupCreatDto } from '../dtos/group-create-dto'
import { GroupUpdatDto } from '../dtos/group-update-dto'

@Injectable({
  providedIn: 'root'
})
export class GroupApiService {
  constructor(private httpClient: HttpClient) {}

  getAllGroups(): Observable<Group[]> {
    return this.httpClient.get<Group[]>('groups')
  }

  getGroupById(groupId: string): Observable<Group> {
    return this.httpClient.get<Group>(`groups/${groupId}`)
  }

  createGroup(group: GroupCreatDto): Observable<Group> {
    return this.httpClient.post<Group>('groups', group)
  }

  updateGroup(groupId: string, groupUpdates: GroupUpdatDto): Observable<Group> {
    return this.httpClient.patch<Group>(`groups/${groupId}`, groupUpdates)
  }

  deleteGroup(groupId: string): Observable<void> {
    return this.httpClient.delete<void>(`groups/${groupId}`)
  }

  addToGroupViaInviteCode(inviteCode: string): Observable<Group> {
    const params = new HttpParams({ fromObject: { inviteCode } })
    return this.httpClient.post<Group>('groups/join', null, { params })
  }

  getGroupMembers(groupId: string): Observable<Member[]> {
    return this.httpClient.get<Member[]>(`groups/${groupId}/members`)
  }

  addGroupMember(groupId: string, userId: string): Observable<Member[]> {
    return this.httpClient.post<Member[]>(`groups/${groupId}/members`, userId)
  }

  removeGroupMember(groupId: string, userId: string): Observable<void> {
    return this.httpClient.delete<void>(`groups/${groupId}/members/${userId}`)
  }
}
