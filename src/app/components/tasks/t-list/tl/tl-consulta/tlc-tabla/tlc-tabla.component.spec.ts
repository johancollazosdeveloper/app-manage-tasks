import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TlcTablaComponent } from './tlc-tabla.component';

describe('TlcTablaComponent', () => {
  let component: TlcTablaComponent;
  let fixture: ComponentFixture<TlcTablaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TlcTablaComponent],
    });
    fixture = TestBed.createComponent(TlcTablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
