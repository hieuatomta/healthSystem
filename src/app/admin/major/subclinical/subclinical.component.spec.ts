import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {SubclinicalComponent} from './subclinical.component';


describe('UsersComponent', () => {
  let component: SubclinicalComponent;
  let fixture: ComponentFixture<SubclinicalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubclinicalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubclinicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
