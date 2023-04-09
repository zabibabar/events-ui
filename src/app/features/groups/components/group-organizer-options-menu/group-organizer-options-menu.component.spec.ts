import { ComponentFixture, TestBed } from '@angular/core/testing'

import { GroupOrganizerOptionsMenuComponent } from './group-organizer-options-menu.component'

describe('GroupOrganizerOptionsMenuComponent', () => {
  let component: GroupOrganizerOptionsMenuComponent
  let fixture: ComponentFixture<GroupOrganizerOptionsMenuComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GroupOrganizerOptionsMenuComponent]
    }).compileComponents()

    fixture = TestBed.createComponent(GroupOrganizerOptionsMenuComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
