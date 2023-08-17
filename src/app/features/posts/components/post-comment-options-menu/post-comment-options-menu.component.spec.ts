import { ComponentFixture, TestBed } from '@angular/core/testing'

import { PostCommentOptionsMenuComponent } from './post-comment-options-menu.component'

describe('PostCommentOptionsMenuComponent', () => {
  let component: PostCommentOptionsMenuComponent
  let fixture: ComponentFixture<PostCommentOptionsMenuComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostCommentOptionsMenuComponent]
    }).compileComponents()

    fixture = TestBed.createComponent(PostCommentOptionsMenuComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
