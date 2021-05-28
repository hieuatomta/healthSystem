import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {StreatmentsUpdateComponent} from './streatments-update.component';


describe('UserUpdateComponent', () => {
  let component: StreatmentsUpdateComponent;
  let fixture: ComponentFixture<StreatmentsUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StreatmentsUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StreatmentsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
