import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TlgpComponent } from './tlgp.component';

describe('TlgpComponent', () => {
  let component: TlgpComponent;
  let fixture: ComponentFixture<TlgpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TlgpComponent]
    });
    fixture = TestBed.createComponent(TlgpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
