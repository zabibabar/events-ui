import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventAttendeeGridComponent } from './event-attendee-grid.component';

describe('EventAttendeeGridComponent', () => {
  let component: EventAttendeeGridComponent;
  let fixture: ComponentFixture<EventAttendeeGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventAttendeeGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventAttendeeGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
