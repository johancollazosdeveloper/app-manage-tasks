import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ALoginComponent } from './a-login.component';

describe('ALoginComponent', () => {
  let component: ALoginComponent;
  let fixture: ComponentFixture<ALoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ALoginComponent]
    });
    fixture = TestBed.createComponent(ALoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
