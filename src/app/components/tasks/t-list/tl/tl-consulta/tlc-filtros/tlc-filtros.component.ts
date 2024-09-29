import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-tlc-filtros',
  templateUrl: './tlc-filtros.component.html',
  styleUrls: ['./tlc-filtros.component.css'],
})
export class TlcFiltrosComponent {
  @Output() filterChanged = new EventEmitter<string>();

  onFilterChange(filter: string) {
    this.filterChanged.emit(filter);
  }
}
