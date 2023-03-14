import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { UserCreateDto } from '../dtos/user-create-dto'
import { User } from '../interfaces/user'

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  constructor(private httpClient: HttpClient) {}

  createUser(user: UserCreateDto): Observable<User> {
    return this.httpClient.post<User>('users', user)
  }

  selectUser(externalId: string): Observable<User> {
    return this.httpClient.get<User>(`users/${externalId}`)
  }
}
