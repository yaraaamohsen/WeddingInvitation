import { Component, signal } from '@angular/core';
import { CurtainComponent } from './components/curtain/curtain.component';
import { InvitationComponent } from './components/invitation/invitation.component';
import { WeddingConfig } from './models/wedding';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CurtainComponent, InvitationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  isCurtainDone = signal(false);

  config: WeddingConfig = {
    groomName: 'Selim',
    brideName: 'Yara',
    weddingDate: new Date('2026-10-30T00:00:00'),
    dateParts: ['30', 'Oct', '2026'],
    venueName: 'NIRENA HALL',
    venueAddress: ['Police Club, Salah Salem'],
    venueCity: 'Salah Salem, Cairo',
    locationUrl: 'https://maps.app.goo.gl/Vv86E7uWkbontSQp8?g_st=ic',
  };

  onCurtainDone(): void {
    this.isCurtainDone.set(true);
  }
}
