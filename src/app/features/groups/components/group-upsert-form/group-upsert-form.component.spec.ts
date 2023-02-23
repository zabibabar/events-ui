import { ComponentFixture, TestBed } from '@angular/core/testing'

import { GroupUpsertFormComponent } from './group-upsert-form.component'

describe('GroupUpsertFormComponent', () => {
  let component: GroupUpsertFormComponent
  let fixture: ComponentFixture<GroupUpsertFormComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GroupUpsertFormComponent]
    }).compileComponents()

    fixture = TestBed.createComponent(GroupUpsertFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
