import { Component, signal } from '@angular/core';
import { CurtainComponent } from './components/curtain/curtain.component';
import { InvitationComponent } from './components/invitation/invitation.component';
import { Phase, WeddingConfig } from './models/wedding';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CurtainComponent, InvitationComponent],
  template: `
    @if (phase() === 'curtain') {
      <app-curtain (curtainDone)="phase.set('invitation')" />
    } @else {
      <app-invitation [config]="config" />
    }
  `,
})
export class AppComponent {
  phase = signal<Phase>('curtain');

  config: WeddingConfig = {
    groomName: 'Selim',
    brideName: 'Yara',
    weddingDate: new Date('2027-09-10T00:00:00'),
    dateParts: ['10', 'Sept', '2026'],
    venueName: 'Villa Medicea di Artimino',
    venueAddress: ['Via di Papa Leone X, 28'],
    venueCity: 'Artimino, Florencia',
    busPickup: 'Piazza della Signoria',
    busPickupTime: '16:00h',
    busReturnTime: '02:00h',
    bankHolder: 'SELIM & YARA',
    bankIban: 'ES00 0000 0000 0000 0000 0000',
    bankReference: 'Selim & Yara Wedding',
  };
}
