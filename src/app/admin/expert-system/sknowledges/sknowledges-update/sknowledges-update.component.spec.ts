import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {SknowledgesUpdateComponent} from './sknowledges-update.component';


describe('UserUpdateComponent', () => {
  let component: SknowledgesUpdateComponent;
  let fixture: ComponentFixture<SknowledgesUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SknowledgesUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SknowledgesUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
