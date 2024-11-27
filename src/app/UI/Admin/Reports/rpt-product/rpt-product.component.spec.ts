import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RptProductComponent } from './rpt-product.component';

describe('RptProductComponent', () => {
  let component: RptProductComponent;
  let fixture: ComponentFixture<RptProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RptProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RptProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
