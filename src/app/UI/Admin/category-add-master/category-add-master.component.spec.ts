import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryAddMasterComponent } from './category-add-master.component';

describe('CategoryAddMasterComponent', () => {
  let component: CategoryAddMasterComponent;
  let fixture: ComponentFixture<CategoryAddMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryAddMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryAddMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
