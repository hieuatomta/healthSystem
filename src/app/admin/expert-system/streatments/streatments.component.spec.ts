import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {StreatmentsComponent} from './streatments.component';


describe('UsersComponent', () => {
  let component: StreatmentsComponent;
  let fixture: ComponentFixture<StreatmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StreatmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StreatmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
