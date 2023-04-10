import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventGroupCardComponent } from './event-group-card.component';

describe('EventGroupCardComponent', () => {
  let component: EventGroupCardComponent;
  let fixture: ComponentFixture<EventGroupCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventGroupCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventGroupCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
