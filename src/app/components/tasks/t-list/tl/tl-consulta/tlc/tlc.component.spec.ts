import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TlcComponent } from './tlc.component';

describe('TlcComponent', () => {
  let component: TlcComponent;
  let fixture: ComponentFixture<TlcComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TlcComponent],
    });
    fixture = TestBed.createComponent(TlcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
