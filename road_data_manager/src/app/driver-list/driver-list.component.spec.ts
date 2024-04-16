import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DriverListComponent } from './driver-list.component';

describe('UserListComponent', () => {
  let component: DriverListComponent;
  let fixture: ComponentFixture<DriverListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DriverListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DriverListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
