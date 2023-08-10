import { ComponentFixture, TestBed } from '@angular/core/testing'

import { EventTasksPageComponent } from './event-tasks-page.component'

describe('EventTasksPageComponent', () => {
  let component: EventTasksPageComponent
  let fixture: ComponentFixture<EventTasksPageComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventTasksPageComponent]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(EventTasksPageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
