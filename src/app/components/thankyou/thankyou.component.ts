import { Component, input } from '@angular/core';

@Component({
  selector: 'app-thank-you',
  standalone: true,
  template: `
<section class="bg-white d-flex flex-column align-items-center justify-content-center py-5 px-4">

  <!--
    The original wraps the card in a deep-red rounded container
    and uses clip-path to create a stamp/ticket edge on the inner white card.
  -->
  <div class="position-relative rounded-4 p-3 animate__animated animate__fadeInUp"
       style="background:var(--color-primary); max-width:400px; width:100%;">

    <div class="bg-white rounded-3 py-5 px-4 py-md-5 px-md-5 text-center thank-you-card">
      <h2 class="font-serif fst-italic fw-normal mb-4 animate__animated animate__fadeInUp"
          style="font-size:clamp(28px,6vw,40px); color:var(--color-primary);">
        Thank You
      </h2>
      <p class="mb-4 animate__animated animate__fadeInUp"
         style="font-size:14px; line-height:1.8; color:var(--color-primary);">
        For joining us on this special day. Your presence is the best gift we could receive.
      </p>
      <p class="font-serif fst-italic animate__animated animate__fadeInUp"
         style="font-size:clamp(22px,5vw,30px); color:var(--color-primary);">
        {{ groomName() }} &amp; {{ brideName() }}
      </p>
    </div>

  </div>
</section>
  `,
  styles: [`
    /* Stamp / ticket jagged edge — mirrors the original clip-path */
    .thank-you-card {
      clip-path: polygon(
        0% 8%, 4% 4%, 8% 0%, 15% 2%, 22% 0%, 29% 2%, 36% 0%, 43% 2%,
        50% 0%, 57% 2%, 64% 0%, 71% 2%, 78% 0%, 85% 2%, 92% 0%, 96% 4%,
        100% 8%, 98% 15%, 100% 22%, 98% 29%, 100% 36%, 98% 43%, 100% 50%,
        98% 57%, 100% 64%, 98% 71%, 100% 78%, 98% 85%, 100% 92%,
        96% 96%, 92% 100%, 85% 98%, 78% 100%, 71% 98%, 64% 100%,
        57% 98%, 50% 100%, 43% 98%, 36% 100%, 29% 98%, 22% 100%,
        15% 98%, 8% 100%, 4% 96%, 0% 92%, 2% 85%, 0% 78%, 2% 71%,
        0% 64%, 2% 57%, 0% 50%, 2% 43%, 0% 36%, 2% 29%, 0% 22%, 2% 15%
      );
    }
  `]
})
export class ThankYouComponent {
  groomName = input.required<string>();
  brideName = input.required<string>();
}