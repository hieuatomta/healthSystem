import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {SubclinicalUpdateComponent} from './subclinical-update.component';


describe('UserUpdateComponent', () => {
  let component: SubclinicalUpdateComponent;
  let fixture: ComponentFixture<SubclinicalUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubclinicalUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubclinicalUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
