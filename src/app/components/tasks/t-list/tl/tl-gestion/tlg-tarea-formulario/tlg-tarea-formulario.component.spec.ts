import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TlgTareaFormularioComponent } from './tlg-tarea-formulario.component';

describe('TlgTareaFormularioComponent', () => {
  let component: TlgTareaFormularioComponent;
  let fixture: ComponentFixture<TlgTareaFormularioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TlgTareaFormularioComponent],
    });
    fixture = TestBed.createComponent(TlgTareaFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
