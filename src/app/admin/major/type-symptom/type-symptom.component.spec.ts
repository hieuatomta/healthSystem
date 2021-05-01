import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {TypeSymptomComponent} from './type-symptom.component';


describe('UsersComponent', () => {
  let component: TypeSymptomComponent;
  let fixture: ComponentFixture<TypeSymptomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeSymptomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeSymptomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
