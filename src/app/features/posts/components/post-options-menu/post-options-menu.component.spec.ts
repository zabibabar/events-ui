import { ComponentFixture, TestBed } from '@angular/core/testing'

import { PostOptionsMenuComponent } from './post-options-menu.component'

describe('PostOptionsMenuComponent', () => {
  let component: PostOptionsMenuComponent
  let fixture: ComponentFixture<PostOptionsMenuComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostOptionsMenuComponent]
    }).compileComponents()

    fixture = TestBed.createComponent(PostOptionsMenuComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
