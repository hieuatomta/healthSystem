import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {TypeDiseaseComponent} from './type-disease.component';


describe('UsersComponent', () => {
  let component: TypeDiseaseComponent;
  let fixture: ComponentFixture<TypeDiseaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeDiseaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeDiseaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
