import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAddMasterComponent } from './product-add-master.component';

describe('ProductAddMasterComponent', () => {
  let component: ProductAddMasterComponent;
  let fixture: ComponentFixture<ProductAddMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductAddMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductAddMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
