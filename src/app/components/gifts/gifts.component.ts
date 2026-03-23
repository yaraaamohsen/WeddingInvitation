import { Component, input } from '@angular/core';
import { WeddingConfig } from '../../models/wedding';

@Component({
  selector: 'app-gifts',
  standalone: true,
  template: `
    <section class="d-flex flex-column align-items-center py-5 px-4 text-center" style="background-color:var(--color-beige);">
      <p class="text-uppercase mb-3" style="font-size:11px; letter-spacing:.2em; color:var(--color-primary);">Wedding registry</p>

      <!-- Replace src with assets/gift-icon.png -->
      <img src="assets/gift-icon.png" alt="Gift" class="mb-3" style="width:112px; height:112px; object-fit:contain;" />

      <h2
        class="text-uppercase fw-bold mb-5 animate__animated animate__fadeInUp"
        style="font-size:clamp(36px,8vw,56px); letter-spacing:.1em; color:var(--color-primary); font-family:var(--font-sans);"
      >
        Gifts
      </h2>

      <p class="mb-5 animate__animated animate__fadeInUp" style="max-width:560px; font-size:15px; line-height:1.8; color:var(--color-primary);">
        Your presence is the best gift we could receive. However, if you wish to contribute to our new life together, you can do so via bank transfer.
      </p>

      <p class="font-serif fst-italic mb-5 animate__animated animate__fadeInUp" style="font-size:clamp(24px,5vw,36px); color:var(--color-primary);">
        With all our love
      </p>

      <p class="text-uppercase mb-3" style="font-size:11px; letter-spacing:.2em; color:var(--color-primary);">Bank details</p>

      <div class="px-4 py-4 animate__animated animate__fadeInUp" style="border:2px solid var(--color-primary); display:inline-block;">
        <p class="mb-2" style="font-size:13px; letter-spacing:.1em; color:var(--color-primary);">ACCOUNT HOLDER: {{ config().bankHolder }}</p>
        <p class="mb-2" style="font-size:13px; letter-spacing:.1em; color:var(--color-primary);">IBAN: {{ config().bankIban }}</p>
        <p class="mb-0" style="font-size:13px; letter-spacing:.1em; color:var(--color-primary);">REFERENCE: {{ config().bankReference }}</p>
      </div>
    </section>
  `,
})
export class GiftsComponent {
  config = input.required<WeddingConfig>();
}
