import { Component } from '@angular/core';

@Component({
  selector: 'app-tlc',
  templateUrl: './tlc.component.html',
  styleUrls: ['./tlc.component.css'],
})
export class TlcComponent {
  selectedFilter: string = 'all';

  onFilterChange(filter: string) {
    this.selectedFilter = filter;
  }
}
