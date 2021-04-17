import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {NewsApprovalUpdateComponent} from './news-approval-update.component';


describe('UserUpdateComponent', () => {
  let component: NewsApprovalUpdateComponent;
  let fixture: ComponentFixture<NewsApprovalUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsApprovalUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsApprovalUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
