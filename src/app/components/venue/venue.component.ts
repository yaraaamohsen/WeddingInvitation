import { Component, input } from '@angular/core';
import { WeddingConfig } from '../../models/wedding';

@Component({
  selector: 'app-venue',
  standalone: true,
  templateUrl: './venue.component.html',
  styleUrl: './venue.component.scss',
})
export class VenueComponent {
  config = input.required<WeddingConfig>();
}
