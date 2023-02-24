import { ComponentFixture, TestBed } from '@angular/core/testing'

import { EventUpsertFormComponent } from './event-upsert-form.component'

describe('EventUpsertFormComponent', () => {
  let component: EventUpsertFormComponent
  let fixture: ComponentFixture<EventUpsertFormComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventUpsertFormComponent]
    }).compileComponents()

    fixture = TestBed.createComponent(EventUpsertFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
