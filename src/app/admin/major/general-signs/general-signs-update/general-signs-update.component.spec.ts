import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {GeneralSignsUpdateComponent} from './general-signs-update.component';


describe('UserUpdateComponent', () => {
  let component: GeneralSignsUpdateComponent;
  let fixture: ComponentFixture<GeneralSignsUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralSignsUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralSignsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
