import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierAddMasterComponent } from './supplier-add-master.component';

describe('SupplierAddMasterComponent', () => {
  let component: SupplierAddMasterComponent;
  let fixture: ComponentFixture<SupplierAddMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierAddMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierAddMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
