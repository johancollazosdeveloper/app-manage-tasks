import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TlgtFormularioComponent } from './tlgt-formulario.component';

describe('TlgtFormularioComponent', () => {
  let component: TlgtFormularioComponent;
  let fixture: ComponentFixture<TlgtFormularioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TlgtFormularioComponent]
    });
    fixture = TestBed.createComponent(TlgtFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
