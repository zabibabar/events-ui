import { ComponentFixture, TestBed } from '@angular/core/testing'

import { UserThemeToggleComponent } from './user-theme-toggle.component'

describe('UserThemeToggleComponent', () => {
  let component: UserThemeToggleComponent
  let fixture: ComponentFixture<UserThemeToggleComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserThemeToggleComponent]
    }).compileComponents()

    fixture = TestBed.createComponent(UserThemeToggleComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
