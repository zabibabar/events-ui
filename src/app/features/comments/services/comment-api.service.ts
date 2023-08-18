import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { CommentCreateDto } from '../dtos/comment-create-dto'
import { CommentUpdateDto } from '../dtos/comment-update-dto'
import { CommentApi } from '../interfaces/comment-api.interface'

@Injectable({
  providedIn: 'root'
})
export class CommentApiService {
  constructor(private httpClient: HttpClient) {}

  addComment(postId: string, body: CommentCreateDto): Observable<CommentApi[]> {
    return this.httpClient.post<CommentApi[]>(`posts/${postId}/comments`, body)
  }

  updateComment(postId: string, commentId: string, body: CommentUpdateDto): Observable<CommentApi[]> {
    return this.httpClient.patch<CommentApi[]>(`posts/${postId}/comments/${commentId}`, body)
  }

  removeComment(postId: string, commentId: string): Observable<CommentApi[]> {
    return this.httpClient.delete<CommentApi[]>(`posts/${postId}/comments/${commentId}`)
  }

  likeComment(postId: string, commentId: string): Observable<CommentApi[]> {
    return this.httpClient.post<CommentApi[]>(`posts/${postId}/comments/${commentId}`, null)
  }

  unlikeComment(postId: string, commentId: string): Observable<CommentApi[]> {
    return this.httpClient.delete<CommentApi[]>(`posts/${postId}/comments/${commentId}`)
  }
}
