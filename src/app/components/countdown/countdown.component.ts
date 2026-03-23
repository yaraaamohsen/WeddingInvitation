import { Component, input, OnInit, OnDestroy, signal, computed } from '@angular/core';
import { NgFor } from '@angular/common';
import { CountdownTime } from '../../models/wedding';

interface Tile {
  key: keyof CountdownTime;
  label: string;
}

@Component({
  selector: 'app-countdown',
  standalone: true,
  templateUrl: './countdown.component.html',
  styleUrl: './countdown.component.scss',
})
export class CountdownComponent implements OnInit, OnDestroy {
  /** The target wedding date — passed in from the parent */
  weddingDate = input.required<Date>();

  time = signal<CountdownTime>({ d: 0, h: 0, m: 0, s: 0 });

  /** True once the target date has passed */
  isPast = computed(() => Object.values(this.time()).every((v) => v === 0));

  readonly tiles: Tile[] = [
    { key: 'd', label: 'Days' },
    { key: 'h', label: 'Hours' },
    { key: 'm', label: 'Min' },
    { key: 's', label: 'Sec' },
  ];

  private intervalId!: ReturnType<typeof setInterval>;

  ngOnInit(): void {
    this.calculate(); // immediate first tick
    this.intervalId = setInterval(() => this.calculate(), 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId); // prevent memory leaks
  }

  // ── helpers ────────────────────────────────────────────────────────

  private calculate(): void {
    const diff = this.weddingDate().getTime() - Date.now();

    if (diff <= 0) {
      this.time.set({ d: 0, h: 0, m: 0, s: 0 });
      clearInterval(this.intervalId); // stop ticking after date
      return;
    }

    this.time.set({
      d: Math.floor(diff / 86_400_000),
      h: Math.floor((diff % 86_400_000) / 3_600_000),
      m: Math.floor((diff % 3_600_000) / 60_000),
      s: Math.floor((diff % 60_000) / 1_000),
    });
  }

  /** Zero-pad a number to at least 2 digits: 9 → "09" */
  pad(n: number): string {
    return String(n).padStart(2, '0');
  }
}
