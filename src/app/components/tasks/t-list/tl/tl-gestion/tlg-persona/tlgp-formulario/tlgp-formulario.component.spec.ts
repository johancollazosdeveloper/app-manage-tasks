import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TlgpFormularioComponent } from './tlgp-formulario.component';

describe('TlgpFormularioComponent', () => {
  let component: TlgpFormularioComponent;
  let fixture: ComponentFixture<TlgpFormularioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TlgpFormularioComponent]
    });
    fixture = TestBed.createComponent(TlgpFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
