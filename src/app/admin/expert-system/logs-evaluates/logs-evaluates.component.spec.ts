import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {LogsEvaluatesComponent} from './logs-evaluates.component';


describe('UsersComponent', () => {
  let component: LogsEvaluatesComponent;
  let fixture: ComponentFixture<LogsEvaluatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogsEvaluatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogsEvaluatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
