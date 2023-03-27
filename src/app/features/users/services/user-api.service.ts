import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { UserCreateDto } from '../dtos/user-create-dto'
import { UserUpdateDto } from '../dtos/user-update-dto'
import { User } from '../interfaces/user'

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  constructor(private httpClient: HttpClient) {}

  createUser(user: UserCreateDto): Observable<User> {
    return this.httpClient.post<User>('users', user)
  }

  getUserByExternalId(externalId: string): Observable<User> {
    return this.httpClient.get<User>(`users/external/${externalId}`)
  }

  getUser(userId: string): Observable<User> {
    return this.httpClient.get<User>(`users/${userId}`)
  }

  updateUser(userId: string, changes: UserUpdateDto): Observable<User> {
    return this.httpClient.patch<User>(`users/${userId}`, changes)
  }

  deleteUser(userId: string): Observable<void> {
    return this.httpClient.delete<void>(`users/${userId}`)
  }

  uploadUserPicture(userId: string, image: File): Observable<string> {
    const formData = new FormData()
    formData.append('user_picture', image)
    return this.httpClient.post(`users/${userId}/uploadPicture`, formData, { responseType: 'text' })
  }
}
