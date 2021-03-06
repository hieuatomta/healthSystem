import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CategoryUpdateComponent} from './category-update.component';


describe('UserUpdateComponent', () => {
  let component: CategoryUpdateComponent;
  let fixture: ComponentFixture<CategoryUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
