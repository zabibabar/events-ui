import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { PostApi } from '../interfaces/post-api.interface'
import { PostCreateDto } from '../dtos/post-create-dto'
import { PostUpdateDto } from '../dtos/post-update-dto'

@Injectable({
  providedIn: 'root'
})
export class PostApiService {
  constructor(private httpClient: HttpClient) {}

  getAllPosts(sourceId: string): Observable<PostApi[]> {
    return this.httpClient.get<PostApi[]>(`posts`)
  }

  createPost(body: PostCreateDto): Observable<PostApi> {
    return this.httpClient.post<PostApi>(`posts`, body)
  }

  updatePost(postId: string, body: PostUpdateDto): Observable<PostApi> {
    return this.httpClient.patch<PostApi>(`posts/${postId}`, body)
  }

  deletePost(postId: string): Observable<void> {
    return this.httpClient.delete<void>(`posts/${postId}`)
  }

  likePost(postId: string): Observable<PostApi> {
    return this.httpClient.post<PostApi>(`posts/${postId}/${postId}/like`, null)
  }

  unlikePost(postId: string): Observable<PostApi> {
    return this.httpClient.delete<PostApi>(`posts/${postId}/${postId}/like`)
  }
}
