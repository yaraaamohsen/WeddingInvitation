import { Component, input, signal } from '@angular/core';
import { HeroComponent } from '../hero/hero.component';
import { ScratchRevealComponent } from '../scratch-reveal/scratch-reveal.component';
import { CountdownComponent } from '../countdown/countdown.component';
import { WeddingConfig } from '../../models/wedding';
import { VenueComponent } from '../venue/venue.component';
import { DressCodeComponent } from '../dress-code/dress-code.component';
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
    DressCodeComponent,
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

  onAllScratched(): void {
    this.showConfetti.set(true);
    this.showRest.set(true);
    setTimeout(() => this.showConfetti.set(false), 3500);
  }
}
