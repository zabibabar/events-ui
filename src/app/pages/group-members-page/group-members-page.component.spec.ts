import { ComponentFixture, TestBed } from '@angular/core/testing'

import { GroupMembersPageComponent } from './group-members-page.component'

describe('GroupMembersPageComponent', () => {
  let component: GroupMembersPageComponent
  let fixture: ComponentFixture<GroupMembersPageComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GroupMembersPageComponent]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupMembersPageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
