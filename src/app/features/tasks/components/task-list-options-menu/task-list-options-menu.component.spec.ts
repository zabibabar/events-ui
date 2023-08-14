import { ComponentFixture, TestBed } from '@angular/core/testing'

import { TaskListOptionsMenuComponent } from './task-list-options-menu.component'

describe('TaskListOptionsMenuComponent', () => {
  let component: TaskListOptionsMenuComponent
  let fixture: ComponentFixture<TaskListOptionsMenuComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskListOptionsMenuComponent]
    }).compileComponents()

    fixture = TestBed.createComponent(TaskListOptionsMenuComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
