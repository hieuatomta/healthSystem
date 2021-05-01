import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {TypeDiseaseUpdateComponent} from './type-disease-update.component';


describe('UserUpdateComponent', () => {
  let component: TypeDiseaseUpdateComponent;
  let fixture: ComponentFixture<TypeDiseaseUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeDiseaseUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeDiseaseUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
