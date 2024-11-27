import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RptDailyIncomeComponent } from './rpt-daily-income.component';

describe('RptDailyIncomeComponent', () => {
  let component: RptDailyIncomeComponent;
  let fixture: ComponentFixture<RptDailyIncomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RptDailyIncomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RptDailyIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
