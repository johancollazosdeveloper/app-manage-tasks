import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TlgtComponent } from './tlgt.component';

describe('TlgtComponent', () => {
  let component: TlgtComponent;
  let fixture: ComponentFixture<TlgtComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TlgtComponent]
    });
    fixture = TestBed.createComponent(TlgtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
