import { ComponentFixture, TestBed } from '@angular/core/testing'

import { EventOptionsMenuComponent } from './event-options-menu.component'

describe('EventOptionsMenuComponent', () => {
  let component: EventOptionsMenuComponent
  let fixture: ComponentFixture<EventOptionsMenuComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventOptionsMenuComponent]
    }).compileComponents()

    fixture = TestBed.createComponent(EventOptionsMenuComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
