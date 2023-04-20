import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { UserCreateDto } from '../dtos/user-create-dto'
import { UserUpdateDto } from '../dtos/user-update-dto'
import { CurrentUser, User } from '../interfaces/user'

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  constructor(private httpClient: HttpClient) {}

  createUser(user: UserCreateDto): Observable<CurrentUser> {
    return this.httpClient.post<CurrentUser>('users', user)
  }

  getUserByExternalId(externalId: string): Observable<CurrentUser> {
    return this.httpClient.get<CurrentUser>(`users/external/${externalId}`)
  }

  getUser(userId: string): Observable<User> {
    return this.httpClient.get<User>(`users/${userId}`)
  }

  updateUser(userId: string, changes: UserUpdateDto): Observable<CurrentUser> {
    return this.httpClient.patch<CurrentUser>(`users/${userId}`, changes)
  }

  uploadUserPicture(userId: string, image: File): Observable<string> {
    const formData = new FormData()
    formData.append('user_picture', image)
    return this.httpClient.post(`users/${userId}/uploadPicture`, formData, { responseType: 'text' })
  }
}
