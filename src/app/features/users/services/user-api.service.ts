import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { User } from '../interfaces/user'

type UserCreateDTO = Omit<User, 'id'>
type UserUpdateDTO = Partial<UserCreateDTO>

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  constructor(private httpClient: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>('/users')
  }

  createUser(group: UserCreateDTO): Observable<User> {
    return this.httpClient.post<User>('/users', group)
  }

  getUser(userId: string): Observable<User> {
    return this.httpClient.get<User>(`/users/${userId}`)
  }

  updateUser(userId: string, groupUpdates: UserUpdateDTO): Observable<User> {
    return this.httpClient.put<User>(`/users/${userId}`, groupUpdates)
  }

  deleteUser(userId: string): Observable<User> {
    return this.httpClient.delete<User>(`/users/${userId}`)
  }
}
