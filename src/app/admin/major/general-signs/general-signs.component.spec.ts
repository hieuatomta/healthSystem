import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {GeneralSignsComponent} from './general-signs.component';


describe('UsersComponent', () => {
  let component: GeneralSignsComponent;
  let fixture: ComponentFixture<GeneralSignsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralSignsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralSignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
