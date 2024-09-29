import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TlgHabilidadFormularioComponent } from './tlg-habilidad-formulario.component';

describe('TlgHabilidadFormularioComponent', () => {
  let component: TlgHabilidadFormularioComponent;
  let fixture: ComponentFixture<TlgHabilidadFormularioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TlgHabilidadFormularioComponent],
    });
    fixture = TestBed.createComponent(TlgHabilidadFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
