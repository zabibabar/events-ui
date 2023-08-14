import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { TaskApi } from '../interfaces/task-api.interface'
import { TaskCreateDto } from '../dtos/task-create-dto'
import { TaskUpdateDto } from '../dtos/task-update-dto'
import { TaskListCreateDto } from '../dtos/task-list-create-dto'
import { TaskListApi } from '../interfaces/task-list-api.interface'
import { TaskListUpdateDto } from '../dtos/task-list-update-dto'

@Injectable({
  providedIn: 'root'
})
export class TaskApiService {
  constructor(private httpClient: HttpClient) {}

  getAllTaskLists(eventId: string): Observable<TaskListApi[]> {
    return this.httpClient.get<TaskListApi[]>(`events/${eventId}/task-lists`)
  }

  createTaskList(eventId: string, body: TaskListCreateDto): Observable<TaskListApi> {
    return this.httpClient.post<TaskListApi>(`events/${eventId}/task-lists`, body)
  }

  updateTaskList(eventId: string, taskListId: string, body: TaskListUpdateDto): Observable<TaskListApi> {
    return this.httpClient.patch<TaskListApi>(`events/${eventId}/task-lists/${taskListId}`, body)
  }

  deleteTaskList(eventId: string, taskListId: string): Observable<void> {
    return this.httpClient.delete<void>(`events/${eventId}/task-lists/${taskListId}`)
  }

  addTask(eventId: string, taskListId: string, body: TaskCreateDto): Observable<TaskApi[]> {
    return this.httpClient.post<TaskApi[]>(`events/${eventId}/task-lists/${taskListId}/tasks`, body)
  }

  updateTask(eventId: string, taskListId: string, taskId: string, body: TaskUpdateDto): Observable<TaskApi[]> {
    return this.httpClient.patch<TaskApi[]>(`events/${eventId}/task-lists/${taskListId}/tasks/${taskId}`, body)
  }

  removeTask(eventId: string, taskListId: string, taskId: string): Observable<TaskApi[]> {
    return this.httpClient.delete<TaskApi[]>(`events/${eventId}/task-lists/${taskListId}/tasks/${taskId}`)
  }

  assignTask(eventId: string, taskListId: string, taskId: string, notes?: string): Observable<TaskApi[]> {
    return this.httpClient.post<TaskApi[]>(`events/${eventId}/task-lists/${taskListId}/tasks/${taskId}/assign`, {
      notes
    })
  }

  unassignTask(eventId: string, taskListId: string, taskId: string): Observable<TaskApi[]> {
    return this.httpClient.delete<TaskApi[]>(`events/${eventId}/task-lists/${taskListId}/tasks/${taskId}/assign`)
  }
}
