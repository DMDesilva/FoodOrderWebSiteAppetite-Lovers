import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RptCustomerComponent } from './rpt-customer.component';

describe('RptCustomerComponent', () => {
  let component: RptCustomerComponent;
  let fixture: ComponentFixture<RptCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RptCustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RptCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
