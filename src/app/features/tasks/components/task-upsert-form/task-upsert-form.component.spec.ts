import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskUpsertFormComponent } from './task-upsert-form.component';

describe('TaskUpsertFormComponent', () => {
  let component: TaskUpsertFormComponent;
  let fixture: ComponentFixture<TaskUpsertFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskUpsertFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskUpsertFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
