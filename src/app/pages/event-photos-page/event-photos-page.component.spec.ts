import { ComponentFixture, TestBed } from '@angular/core/testing'

import { EventPhotosPageComponent } from './event-photos-page.component'

describe('EventPhotosPageComponent', () => {
  let component: EventPhotosPageComponent
  let fixture: ComponentFixture<EventPhotosPageComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventPhotosPageComponent]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(EventPhotosPageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
