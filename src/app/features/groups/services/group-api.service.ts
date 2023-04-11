import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Group } from '../interfaces/group'
import { Member } from '../interfaces/member'
import { GroupCreateDto } from '../dtos/group-create-dto'
import { GroupUpdateDto } from '../dtos/group-update-dto'
import { GroupRequestFilterOptions } from '../interfaces/group-request-filter-options'

@Injectable({
  providedIn: 'root'
})
export class GroupApiService {
  constructor(private httpClient: HttpClient) {}

  getAllGroups(filterOptions: GroupRequestFilterOptions): Observable<Group[]> {
    const params = new HttpParams({ fromObject: { ...filterOptions } })
    return this.httpClient.get<Group[]>('groups', { params })
  }

  getGroupById(groupId: string): Observable<Group> {
    return this.httpClient.get<Group>(`groups/${groupId}`)
  }

  createGroup(group: GroupCreateDto): Observable<Group> {
    return this.httpClient.post<Group>('groups', group)
  }

  updateGroup(groupId: string, groupUpdates: GroupUpdateDto): Observable<Group> {
    return this.httpClient.patch<Group>(`groups/${groupId}`, groupUpdates)
  }

  deleteGroup(groupId: string): Observable<void> {
    return this.httpClient.delete<void>(`groups/${groupId}`, { body: { currentDate: new Date() } })
  }

  uploadGroupPicture(groupId: string, image: File): Observable<string> {
    const formData = new FormData()
    formData.append('group_picture', image)
    return this.httpClient.post(`groups/${groupId}/uploadPicture`, formData, { responseType: 'text' })
  }

  addToGroupViaInviteCode(inviteCode: string): Observable<Group> {
    const params = new HttpParams({ fromObject: { inviteCode } })
    return this.httpClient.post<Group>('groups/join', null, { params })
  }

  getGroupMembers(groupId: string): Observable<Member[]> {
    return this.httpClient.get<Member[]>(`groups/${groupId}/members`)
  }

  addGroupMember(groupId: string, memberId: string): Observable<Member[]> {
    return this.httpClient.post<Member[]>(`groups/${groupId}/members`, memberId)
  }

  updateGroupMember(groupId: string, memberId: string, isOrganizer: boolean): Observable<Member[]> {
    return this.httpClient.patch<Member[]>(`groups/${groupId}/members/${memberId}`, { isOrganizer })
  }

  removeGroupMember(groupId: string, memberId: string): Observable<Member[]> {
    return this.httpClient.delete<Member[]>(`groups/${groupId}/members/${memberId}`)
  }
}
