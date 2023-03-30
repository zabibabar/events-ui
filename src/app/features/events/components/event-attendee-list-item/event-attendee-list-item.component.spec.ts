import { ComponentFixture, TestBed } from '@angular/core/testing'

import { EventAttendeeListItemComponent } from './event-attendee-list-item.component'

describe('EventAttendeeListItemComponent', () => {
  let component: EventAttendeeListItemComponent
  let fixture: ComponentFixture<EventAttendeeListItemComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventAttendeeListItemComponent]
    }).compileComponents()

    fixture = TestBed.createComponent(EventAttendeeListItemComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
