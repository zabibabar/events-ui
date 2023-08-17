import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { PostCommentCreateDto } from '../dtos/post-comment-create-dto'
import { PostCommentUpdateDto } from '../dtos/post-comment-update-dto'
import { PostApi } from '../interfaces/post-api.interface'
import { PostCommentApi } from '../interfaces/post-comment-api.interface'
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

  addComment(postId: string, body: PostCommentCreateDto): Observable<PostCommentApi[]> {
    return this.httpClient.post<PostCommentApi[]>(`posts/${postId}/comments`, body)
  }

  updateComment(postId: string, commentId: string, body: PostCommentUpdateDto): Observable<PostCommentApi[]> {
    return this.httpClient.patch<PostCommentApi[]>(`posts/${postId}/comments/${commentId}`, body)
  }

  removeComment(postId: string, commentId: string): Observable<PostCommentApi[]> {
    return this.httpClient.delete<PostCommentApi[]>(`posts/${postId}/comments/${commentId}`)
  }

  likeComment(postId: string, commentId: string): Observable<PostCommentApi[]> {
    return this.httpClient.post<PostCommentApi[]>(`posts/${postId}/comments/${commentId}`, null)
  }

  unlikeComment(postId: string, commentId: string): Observable<PostCommentApi[]> {
    return this.httpClient.delete<PostCommentApi[]>(`posts/${postId}/comments/${commentId}`)
  }
}
