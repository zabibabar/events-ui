import { ComponentFixture, TestBed } from '@angular/core/testing'

import { PostCommentUpsertFormComponent } from './post-comment-upsert-form.component'

describe('PostCommentUpsertFormComponent', () => {
  let component: PostCommentUpsertFormComponent
  let fixture: ComponentFixture<PostCommentUpsertFormComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostCommentUpsertFormComponent]
    }).compileComponents()

    fixture = TestBed.createComponent(PostCommentUpsertFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
