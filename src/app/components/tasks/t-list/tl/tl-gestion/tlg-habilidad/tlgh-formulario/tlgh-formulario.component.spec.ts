import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TlghFormularioComponent } from './tlgh-formulario.component';

describe('TlghFormularioComponent', () => {
  let component: TlghFormularioComponent;
  let fixture: ComponentFixture<TlghFormularioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TlghFormularioComponent]
    });
    fixture = TestBed.createComponent(TlghFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
