import { ComponentFixture, TestBed } from '@angular/core/testing'

import { GroupEventsPageComponent } from './group-events-page.component'

describe('GroupEventsPageComponent', () => {
  let component: GroupEventsPageComponent
  let fixture: ComponentFixture<GroupEventsPageComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GroupEventsPageComponent]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupEventsPageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
