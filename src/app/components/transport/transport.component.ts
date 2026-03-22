import { Component, input } from '@angular/core';
import { WeddingConfig } from '../../models/wedding';
@Component({
  selector: 'app-transport',
  standalone: true,
  template: `
    <section
      class="bg-white d-flex flex-column align-items-center py-5 px-4 text-center"
    >
      <p
        class="text-uppercase mb-3"
        style="font-size:11px; letter-spacing:.2em; color:var(--color-primary);"
      >
        How to get there
      </p>

      <h2
        class="text-uppercase fw-bold mb-5 animate__animated animate__fadeInUp"
        style="font-size:clamp(36px,8vw,56px); letter-spacing:.1em; color:var(--color-primary); font-family:var(--font-sans);"
      >
        Transport
      </h2>

      <p
        class="mb-5 animate__animated animate__fadeInUp"
        style="max-width:560px; font-size:15px; line-height:1.8; color:var(--color-primary);"
      >
        We have organized buses from the center of Florence to the villa so you
        can enjoy the celebration without worries.
      </p>

      <p
        class="text-uppercase mb-3"
        style="font-size:11px; letter-spacing:.2em; color:var(--color-primary);"
      >
        Bus departure
      </p>
      <p
        class="fw-bold mb-1 animate__animated animate__fadeInUp"
        style="font-size:clamp(20px,4vw,28px); color:var(--color-primary); font-family:var(--font-sans);"
      >
        {{ config().busPickup }}
      </p>
      <p
        class="mb-5 animate__animated animate__fadeInUp"
        style="font-size:clamp(18px,3.5vw,24px); color:var(--color-primary); font-family:var(--font-sans);"
      >
        {{ config().busPickupTime }}
      </p>

      <p
        class="text-uppercase mb-3"
        style="font-size:11px; letter-spacing:.2em; color:var(--color-primary);"
      >
        Return to Florence
      </p>
      <p
        class="mb-5 animate__animated animate__fadeInUp"
        style="font-size:clamp(18px,3.5vw,24px); color:var(--color-primary); font-family:var(--font-sans);"
      >
        {{ config().busReturnTime }}
      </p>

      <p
        class="font-serif fst-italic animate__animated animate__fadeInUp"
        style="font-size:20px; color:var(--color-primary); max-width:480px;"
      >
        Please indicate in your RSVP if you need transport
      </p>
    </section>
  `,
})
export class TransportComponent {
  config = input.required<WeddingConfig>();
}
