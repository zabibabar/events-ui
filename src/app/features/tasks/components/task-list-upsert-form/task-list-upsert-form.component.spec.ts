import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListUpsertFormComponent } from './task-list-upsert-form.component';

describe('TaskListUpsertFormComponent', () => {
  let component: TaskListUpsertFormComponent;
  let fixture: ComponentFixture<TaskListUpsertFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskListUpsertFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskListUpsertFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
