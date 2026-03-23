import { Component, input } from '@angular/core';
import { WeddingConfig } from '../../models/wedding';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  config = input.required<WeddingConfig>();
}
