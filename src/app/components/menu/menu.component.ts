import { Component, input } from '@angular/core';
import { MenuItem } from '../../models/wedding';

@Component({
  selector: 'app-menu',
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  items = input.required<MenuItem[]>();
}
