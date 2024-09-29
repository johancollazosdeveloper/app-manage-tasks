import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TlgPersonaFormularioComponent } from './tlg-persona-formulario.component';

describe('TlgPersonaFormularioComponent', () => {
  let component: TlgPersonaFormularioComponent;
  let fixture: ComponentFixture<TlgPersonaFormularioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TlgPersonaFormularioComponent],
    });
    fixture = TestBed.createComponent(TlgPersonaFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
