import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CommentOptionsMenuComponent } from './comment-options-menu.component'

describe('CommentOptionsMenuComponent', () => {
  let component: CommentOptionsMenuComponent
  let fixture: ComponentFixture<CommentOptionsMenuComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommentOptionsMenuComponent]
    }).compileComponents()

    fixture = TestBed.createComponent(CommentOptionsMenuComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
