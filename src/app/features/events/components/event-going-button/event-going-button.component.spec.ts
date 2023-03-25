import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventGoingButtonComponent } from './event-going-button.component';

describe('EventGoingButtonComponent', () => {
  let component: EventGoingButtonComponent;
  let fixture: ComponentFixture<EventGoingButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventGoingButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventGoingButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
