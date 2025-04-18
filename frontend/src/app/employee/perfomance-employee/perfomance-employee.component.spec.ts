import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfomanceEmployeeComponent } from './perfomance-employee.component';

describe('PerfomanceEmployeeComponent', () => {
  let component: PerfomanceEmployeeComponent;
  let fixture: ComponentFixture<PerfomanceEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PerfomanceEmployeeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfomanceEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
