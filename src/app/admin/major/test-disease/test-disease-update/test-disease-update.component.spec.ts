import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {TestDiseaseUpdateComponent} from './test-disease-update.component';


describe('UserUpdateComponent', () => {
  let component: TestDiseaseUpdateComponent;
  let fixture: ComponentFixture<TestDiseaseUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestDiseaseUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestDiseaseUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
