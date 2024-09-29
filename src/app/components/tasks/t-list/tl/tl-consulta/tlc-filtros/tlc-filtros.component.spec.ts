import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TlcFiltrosComponent } from './tlc-filtros.component';

describe('TlcFiltrosComponent', () => {
  let component: TlcFiltrosComponent;
  let fixture: ComponentFixture<TlcFiltrosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TlcFiltrosComponent]
    });
    fixture = TestBed.createComponent(TlcFiltrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
