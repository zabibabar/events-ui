import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventOrganizerCardComponent } from './event-organizer-card.component';

describe('EventOrganizerCardComponent', () => {
  let component: EventOrganizerCardComponent;
  let fixture: ComponentFixture<EventOrganizerCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventOrganizerCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventOrganizerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
