import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { TaskList } from '../interfaces/task-list.interface'
import { Task } from '../interfaces/task.interface'
import { TaskCreateDto } from '../dtos/task-create-dto'
import { TaskUpdateDto } from '../dtos/task-update-dto'
import { TaskListCreateDto } from '../dtos/task-list-create-dto'

@Injectable({
  providedIn: 'root'
})
export class TaskApiService {
  constructor(private httpClient: HttpClient) {}

  getAllTaskLists(eventId: string): Observable<TaskList[]> {
    return this.httpClient.get<TaskList[]>(`events/${eventId}/task-lists`)
  }

  createTaskList(eventId: string, body: TaskListCreateDto): Observable<TaskList> {
    return this.httpClient.post<TaskList>(`events/${eventId}/task-lists`, body)
  }

  updateTaskList(eventId: string, taskListId: string, body: TaskUpdateDto): Observable<TaskList> {
    return this.httpClient.patch<TaskList>(`events/${eventId}/task-lists/${taskListId}`, body)
  }

  deleteTaskList(eventId: string, taskListId: string): Observable<void> {
    return this.httpClient.delete<void>(`events/${eventId}/task-lists/${taskListId}`)
  }

  addTask(eventId: string, taskListId: string, body: TaskCreateDto): Observable<Task[]> {
    return this.httpClient.post<Task[]>(`events/${eventId}/task-lists/${taskListId}`, body)
  }

  updateTask(eventId: string, taskListId: string, taskId: string, body: TaskUpdateDto): Observable<Task[]> {
    return this.httpClient.patch<Task[]>(`events/${eventId}/task-lists/${taskListId}/task/${taskId}`, body)
  }

  removeTask(eventId: string, taskListId: string, taskId: string): Observable<Task[]> {
    return this.httpClient.delete<Task[]>(`events/${eventId}/task-lists/${taskListId}/task/${taskId}`)
  }

  assignTask(eventId: string, taskListId: string, taskId: string, notes?: string): Observable<Task[]> {
    return this.httpClient.post<Task[]>(`events/${eventId}/task-lists/${taskListId}/task/${taskId}/assign`, { notes })
  }

  unassignTask(eventId: string, taskListId: string, taskId: string): Observable<Task[]> {
    return this.httpClient.delete<Task[]>(`events/${eventId}/task-lists/${taskListId}/task/${taskId}/assign`)
  }
}
