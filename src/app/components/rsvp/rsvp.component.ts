import { NgClass } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-rsvp',
  standalone: true,
  imports: [FormsModule, NgClass],
  templateUrl: './rsvp.component.html',
  styleUrl: './rsvp.component.scss',
})
export class RsvpComponent {
  name = signal('');
  email = signal('');
  message = signal('');
  attending = signal<'yes' | 'no' | null>(null);
  submitted = signal(false);

  get isValid(): boolean {
    return this.name().trim().length > 0 && this.attending() !== null;
  }

  submit(): void {
    if (!this.isValid) return;
    // TODO: wire up to your backend / email service
    console.log({
      name: this.name(),
      email: this.email(),
      attending: this.attending(),
      message: this.message(),
    });
    this.submitted.set(true);
  }
}
