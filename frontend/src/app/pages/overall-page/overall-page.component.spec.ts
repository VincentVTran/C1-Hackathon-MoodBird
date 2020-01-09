import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverallPageComponent } from './overall-page.component';

describe('OverallPageComponent', () => {
  let component: OverallPageComponent;
  let fixture: ComponentFixture<OverallPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverallPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverallPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
