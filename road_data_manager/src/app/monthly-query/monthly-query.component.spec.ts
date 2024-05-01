import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyQueryComponent } from './monthly-query.component';

describe('MonthlyQueryComponent', () => {
  let component: MonthlyQueryComponent;
  let fixture: ComponentFixture<MonthlyQueryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonthlyQueryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MonthlyQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
