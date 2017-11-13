import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoosterMenuComponent } from './booster-menu.component';

describe('BoosterMenuComponent', () => {
  let component: BoosterMenuComponent;
  let fixture: ComponentFixture<BoosterMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoosterMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoosterMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
