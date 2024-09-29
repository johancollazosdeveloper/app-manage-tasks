import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RSignUpComponent } from './r-sign-up.component';

describe('RSignUpComponent', () => {
  let component: RSignUpComponent;
  let fixture: ComponentFixture<RSignUpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RSignUpComponent]
    });
    fixture = TestBed.createComponent(RSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
