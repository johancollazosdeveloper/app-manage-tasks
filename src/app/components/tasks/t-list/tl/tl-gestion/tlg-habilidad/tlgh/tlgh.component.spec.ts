import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TlghComponent } from './tlgh.component';

describe('TlghComponent', () => {
  let component: TlghComponent;
  let fixture: ComponentFixture<TlghComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TlghComponent]
    });
    fixture = TestBed.createComponent(TlghComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
