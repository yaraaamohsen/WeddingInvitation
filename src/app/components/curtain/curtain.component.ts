import { Component, output, signal, AfterViewInit, ViewChild, ElementRef, input } from '@angular/core';
import { WeddingConfig } from '../../models/wedding';

@Component({
  selector: 'app-curtain',
  standalone: true,
  templateUrl: './curtain.component.html',
  styleUrl: './curtain.component.scss',
})
export class CurtainComponent implements AfterViewInit {
  videoStarted = output<void>(); // ← fires when video starts → names fade in
  curtainDone = output<void>(); // ← fires when video ends  → phase switches

  isPlaying = signal(false);

  @ViewChild('curtainVideo')
  videoRef!: ElementRef<HTMLVideoElement>;

  ngAfterViewInit(): void {
    const video = this.videoRef.nativeElement;
    video.addEventListener('ended', () => this.curtainDone.emit());
    video.addEventListener('error', () => {
      setTimeout(() => this.curtainDone.emit(), 500);
    });
  }

  startExperience(): void {
    if (this.isPlaying()) return;
    this.isPlaying.set(true);
    this.videoStarted.emit(); // notify app → show names
    this.videoRef.nativeElement.play();

    const audio = new Audio('assets/intro-music.mp3');
    audio.loop = true;
    audio.play().catch((e) => console.error('Audio play failed:', e));
  }
}
