import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventAttendeeUpsertFormComponent } from './event-attendee-upsert-form.component';

describe('EventAttendeeUpsertFormComponent', () => {
  let component: EventAttendeeUpsertFormComponent;
  let fixture: ComponentFixture<EventAttendeeUpsertFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventAttendeeUpsertFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventAttendeeUpsertFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
