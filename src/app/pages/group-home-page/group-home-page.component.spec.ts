import { ComponentFixture, TestBed } from '@angular/core/testing'

import { GroupHomePageComponent } from './group-home-page.component'

describe('GroupHomePageComponent', () => {
  let component: GroupHomePageComponent
  let fixture: ComponentFixture<GroupHomePageComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GroupHomePageComponent]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupHomePageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
