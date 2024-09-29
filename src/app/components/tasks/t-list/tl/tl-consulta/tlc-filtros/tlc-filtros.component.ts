import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-tlc-filtros',
  templateUrl: './tlc-filtros.component.html',
  styleUrls: ['./tlc-filtros.component.css'],
})
export class TlcFiltrosComponent {
  @Output() filterChanged = new EventEmitter<string>();

  /**
   * @description
   * * Emite el cambio de filtro a otros componentes.
   * * Utiliza un EventEmitter para notificar a los suscriptores del nuevo filtro.
   * @param filter {string} - El nuevo filtro seleccionado por el usuario.
   */
  onFilterChange(filter: string) {
    this.filterChanged.emit(filter);
  }
}
