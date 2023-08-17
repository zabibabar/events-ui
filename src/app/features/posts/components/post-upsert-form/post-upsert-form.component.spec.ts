import { ComponentFixture, TestBed } from '@angular/core/testing'

import { PostUpsertFormComponent } from './post-upsert-form.component'

describe('PostUpsertFormComponent', () => {
  let component: PostUpsertFormComponent
  let fixture: ComponentFixture<PostUpsertFormComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostUpsertFormComponent]
    }).compileComponents()

    fixture = TestBed.createComponent(PostUpsertFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
