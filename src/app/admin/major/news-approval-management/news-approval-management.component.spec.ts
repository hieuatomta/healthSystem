import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {NewsApprovalManagementComponent} from './news-approval-management.component';


describe('UsersComponent', () => {
  let component: NewsApprovalManagementComponent;
  let fixture: ComponentFixture<NewsApprovalManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsApprovalManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsApprovalManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
