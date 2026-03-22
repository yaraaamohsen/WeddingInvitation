// ── curtain.component.ts ─────────────────────────────────────────────
import {
  Component, output, signal,
  AfterViewInit, ViewChild, ElementRef
} from '@angular/core';

@Component({
  selector: 'app-curtain',
  standalone: true,
  templateUrl: './curtain.component.html',
  styleUrl:    './curtain.component.scss',
})
export class CurtainComponent implements AfterViewInit {

  /** Emitted when the curtain animation is done → app switches to hero */
  curtainDone = output<void>();

  /** Whether the video is playing (hides the static closed-curtain image) */
  isPlaying = signal(false);

  @ViewChild('curtainVideo')
  videoRef!: ElementRef<HTMLVideoElement>;

  ngAfterViewInit(): void {
    const video = this.videoRef.nativeElement;

    // When video ends → notify parent
    video.addEventListener('ended', () => {
      this.curtainDone.emit();
    });

    // Fallback: if video fails to load, skip after 4s
    video.addEventListener('error', () => {
      setTimeout(() => this.curtainDone.emit(), 500);
    });
  }

  /** User taps/clicks the curtain to start the experience */
  startExperience(): void {
    if (this.isPlaying()) return;
    this.isPlaying.set(true);
    this.videoRef.nativeElement.play();
  }
}