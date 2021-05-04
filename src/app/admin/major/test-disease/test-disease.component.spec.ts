import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {TestDiseaseComponent} from './test-disease.component';


describe('UsersComponent', () => {
  let component: TestDiseaseComponent;
  let fixture: ComponentFixture<TestDiseaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestDiseaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestDiseaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
