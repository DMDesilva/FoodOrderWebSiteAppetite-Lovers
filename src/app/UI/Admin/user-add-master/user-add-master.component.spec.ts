import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAddMasterComponent } from './user-add-master.component';

describe('UserAddMasterComponent', () => {
  let component: UserAddMasterComponent;
  let fixture: ComponentFixture<UserAddMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAddMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAddMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
