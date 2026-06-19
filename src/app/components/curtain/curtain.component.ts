import { Component, output, signal, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-curtain',
  standalone: true,
  templateUrl: './curtain.component.html',
  styleUrl: './curtain.component.scss',
})
export class CurtainComponent implements AfterViewInit {
  curtainState = signal<'idle' | 'playing' | 'done'>('idle');
  curtainDone = output<void>();

  @ViewChild('curtainVideo')
  videoRef!: ElementRef<HTMLVideoElement>;

  ngAfterViewInit(): void {
    const video = this.videoRef.nativeElement;
    
    // Ensure we are on the first frame
    video.currentTime = 0;
    video.pause();

    video.addEventListener('ended', () => {
      this.curtainState.set('done');
      this.curtainDone.emit();
      // Keep it on the last frame
      video.pause();
    });
  }

  startExperience(): void {
    if (this.curtainState() !== 'idle') return;
    
    this.curtainState.set('playing');
    this.videoRef.nativeElement.play().catch(err => {
      console.warn('Video play failed, likely requires user interaction:', err);
    });

    // Optional: Music can be started here or in the parent
    const audio = new Audio('assets/intro-music.mp3');
    audio.loop = true;
    audio.play().catch((e) => console.error('Audio play failed:', e));
  }
}
