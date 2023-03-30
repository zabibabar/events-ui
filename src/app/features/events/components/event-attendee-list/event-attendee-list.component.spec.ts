import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventAttendeeListComponent } from './event-attendee-list.component';

describe('EventAttendeeListComponent', () => {
  let component: EventAttendeeListComponent;
  let fixture: ComponentFixture<EventAttendeeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventAttendeeListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventAttendeeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
