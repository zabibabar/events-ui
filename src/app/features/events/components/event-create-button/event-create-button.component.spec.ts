import { ComponentFixture, TestBed } from '@angular/core/testing'

import { EventCreateButtonComponent } from './event-create-button.component'

describe('EventCreateButtonComponent', () => {
  let component: EventCreateButtonComponent
  let fixture: ComponentFixture<EventCreateButtonComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventCreateButtonComponent]
    }).compileComponents()

    fixture = TestBed.createComponent(EventCreateButtonComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
