import { Component } from '@angular/core';

@Component({
  selector: 'app-tlc',
  templateUrl: './tlc.component.html',
  styleUrls: ['./tlc.component.css'],
})
export class TlcComponent {
  selectedFilter: string = 'all';

  /**
   * @description
   * * Maneja el cambio de filtro seleccionado.
   * * Actualiza el filtro seleccionado con el nuevo valor.
   * @param filter {string} - El nuevo filtro seleccionado por el usuario.
   */
  onFilterChange(filter: string) {
    this.selectedFilter = filter;
  }
}
