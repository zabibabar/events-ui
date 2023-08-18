import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CommentUpsertFormComponent } from './comment-upsert-form.component'

describe('CommentUpsertFormComponent', () => {
  let component: CommentUpsertFormComponent
  let fixture: ComponentFixture<CommentUpsertFormComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommentUpsertFormComponent]
    }).compileComponents()

    fixture = TestBed.createComponent(CommentUpsertFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
