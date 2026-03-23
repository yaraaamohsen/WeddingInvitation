import { Component, input, signal } from '@angular/core';
import { HeroComponent } from '../hero/hero.component';
import { ScratchRevealComponent } from '../scratch-reveal/scratch-reveal.component';
import { CountdownComponent } from '../countdown/countdown.component';
import { MenuItem, WeddingConfig } from '../../models/wedding';
import { VenueComponent } from '../venue/venue.component';
import { MenuComponent } from '../menu/menu.component';
import { DressCodeComponent } from '../dress-code/dress-code.component';
import { GiftsComponent } from '../gifts/gifts.component';
import { TransportComponent } from '../transport/transport.component';
import { RsvpComponent } from '../rsvp/rsvp.component';
import { ThankYouComponent } from '../thankyou/thankyou.component';
import { ConfettiComponent } from '../confetti/confetti.component';

@Component({
  selector: 'app-invitation',
  standalone: true,
  imports: [
    HeroComponent,
    ScratchRevealComponent,
    CountdownComponent,
    VenueComponent,
    MenuComponent,
    DressCodeComponent,
    GiftsComponent,
    TransportComponent,
    RsvpComponent,
    ThankYouComponent,
    ConfettiComponent,
  ],
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.scss'],
})
export class InvitationComponent {
  config = input.required<WeddingConfig>();

  showConfetti = signal(false);
  showRest = signal(false);

  menuItems: MenuItem[] = [
    {
      course: 'Aperitivo',
      name: 'Selección de antipasti toscanos',
      description: 'Bruschetta, crostini & affettati misti',
    },
    {
      course: 'Primo',
      name: 'Risotto al tartufo nero di Norcia',
      description: 'con parmigiano reggiano 24 mesi',
    },
    {
      course: 'Secondo',
      name: 'Filetto di manzo alla griglia',
      description: 'con salsa al vino rosso e verdure di stagione',
    },
    {
      course: 'Dolce',
      name: 'Torta nuziale con crema di mascarpone',
      description: 'e frutti di bosco freschi',
    },
  ];

  onAllScratched(): void {
    this.showConfetti.set(true);
    this.showRest.set(true);
    setTimeout(() => this.showConfetti.set(false), 3500);
  }
}
