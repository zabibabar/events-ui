import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupOptionsMenuComponent } from './group-options-menu.component';

describe('GroupOptionsMenuComponent', () => {
  let component: GroupOptionsMenuComponent;
  let fixture: ComponentFixture<GroupOptionsMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupOptionsMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupOptionsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
