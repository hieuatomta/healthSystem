import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ProductsSellingComponent} from './products-selling.component';


describe('UsersComponent', () => {
  let component: ProductsSellingComponent;
  let fixture: ComponentFixture<ProductsSellingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsSellingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsSellingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
