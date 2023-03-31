import { ComponentFixture, TestBed } from '@angular/core/testing'

import { GroupMemberGridComponent } from './group-member-grid.component'

describe('GroupMemberGridComponent', () => {
  let component: GroupMemberGridComponent
  let fixture: ComponentFixture<GroupMemberGridComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GroupMemberGridComponent]
    }).compileComponents()

    fixture = TestBed.createComponent(GroupMemberGridComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
