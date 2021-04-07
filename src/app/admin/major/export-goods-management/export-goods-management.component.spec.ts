import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ExportGoodsManagementComponent} from './export-goods-management.component';


describe('UsersComponent', () => {
  let component: ExportGoodsManagementComponent;
  let fixture: ComponentFixture<ExportGoodsManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportGoodsManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportGoodsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
