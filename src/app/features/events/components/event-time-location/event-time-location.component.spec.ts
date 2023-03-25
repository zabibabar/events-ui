import { ComponentFixture, TestBed } from '@angular/core/testing'

import { EventTimeLocationComponent } from './event-time-location.component'

describe('EventTimeLocationComponent', () => {
  let component: EventTimeLocationComponent
  let fixture: ComponentFixture<EventTimeLocationComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventTimeLocationComponent]
    }).compileComponents()

    fixture = TestBed.createComponent(EventTimeLocationComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
