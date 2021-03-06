import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {NewsUpdateComponent} from './news-update.component';


describe('UserUpdateComponent', () => {
  let component: NewsUpdateComponent;
  let fixture: ComponentFixture<NewsUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
