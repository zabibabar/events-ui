import { ComponentFixture, TestBed } from '@angular/core/testing'

import { GroupPhotosPageComponent } from './group-photos-page.component'

describe('GroupPhotosPageComponent', () => {
  let component: GroupPhotosPageComponent
  let fixture: ComponentFixture<GroupPhotosPageComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GroupPhotosPageComponent]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupPhotosPageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
