import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapTsComponent } from './map-ts.component';

describe('MapModuleComponent', () => {
  let component: MapTsComponent;
  let fixture: ComponentFixture<MapTsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapTsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapTsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
