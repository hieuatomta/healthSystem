import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CustomerSellingComponent} from './customer-selling.component';


describe('UsersComponent', () => {
  let component: CustomerSellingComponent;
  let fixture: ComponentFixture<CustomerSellingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerSellingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerSellingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
