import { Component, input } from '@angular/core';
import { WeddingConfig } from '../../models/wedding';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-venue',
  standalone: true,
  imports: [DatePipe],    
  templateUrl: './venue.component.html',
  styleUrl: './venue.component.scss',
})
export class VenueComponent {
  config = input.required<WeddingConfig>();
}
