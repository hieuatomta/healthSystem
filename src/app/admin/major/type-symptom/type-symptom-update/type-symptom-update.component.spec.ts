import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {TypeSymptomUpdateComponent} from './type-symptom-update.component';


describe('UserUpdateComponent', () => {
  let component: TypeSymptomUpdateComponent;
  let fixture: ComponentFixture<TypeSymptomUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeSymptomUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeSymptomUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
