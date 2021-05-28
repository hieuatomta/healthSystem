import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {SknowledgesComponent} from './sknowledges.component';


describe('UsersComponent', () => {
  let component: SknowledgesComponent;
  let fixture: ComponentFixture<SknowledgesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SknowledgesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SknowledgesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
