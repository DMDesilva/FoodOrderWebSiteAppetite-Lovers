import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RptEmplyeeComponent } from './rpt-emplyee.component';

describe('RptEmplyeeComponent', () => {
  let component: RptEmplyeeComponent;
  let fixture: ComponentFixture<RptEmplyeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RptEmplyeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RptEmplyeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
