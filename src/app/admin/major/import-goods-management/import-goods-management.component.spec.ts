import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ImportGoodsManagementComponent} from './import-goods-management.component';


describe('UsersComponent', () => {
  let component: ImportGoodsManagementComponent;
  let fixture: ComponentFixture<ImportGoodsManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportGoodsManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportGoodsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
