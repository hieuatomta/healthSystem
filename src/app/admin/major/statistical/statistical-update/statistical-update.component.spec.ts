import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {StatisticalUpdateComponent} from './statistical-update.component';


describe('UserUpdateComponent', () => {
  let component: StatisticalUpdateComponent;
  let fixture: ComponentFixture<StatisticalUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticalUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticalUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
