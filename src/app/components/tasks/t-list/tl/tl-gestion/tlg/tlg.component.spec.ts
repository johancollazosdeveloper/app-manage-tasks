import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TlgComponent } from './tlg.component';

describe('TlgComponent', () => {
  let component: TlgComponent;
  let fixture: ComponentFixture<TlgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TlgComponent]
    });
    fixture = TestBed.createComponent(TlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
