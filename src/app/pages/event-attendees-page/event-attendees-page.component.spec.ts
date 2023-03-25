import { ComponentFixture, TestBed } from '@angular/core/testing'

import { EventAttendeesPageComponent } from './event-attendees-page.component'

describe('EventAttendeesPageComponent', () => {
  let component: EventAttendeesPageComponent
  let fixture: ComponentFixture<EventAttendeesPageComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventAttendeesPageComponent]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(EventAttendeesPageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
