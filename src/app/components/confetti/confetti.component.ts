// ── confetti.component.ts ────────────────────────────────────────────
import { Component, input, OnChanges, SimpleChanges } from '@angular/core';
import { NgFor, NgIf, NgStyle } from '@angular/common';

export interface ConfettiPiece {
  id:       number;
  x:        number;   // left % position
  delay:    number;   // animation-delay in seconds
  dur:      number;   // animation-duration in seconds
  size:     number;   // width in px
  height:   number;   // height in px (rect pieces are flatter)
  isCircle: boolean;
  color:    string;
  rotate:   number;   // initial rotation in degrees
}

const COLORS = ['#5C2018', '#c9a84c', '#8a1c2c', '#b8962e', '#a04050', '#d4956a'];

@Component({
  selector: 'app-confetti',
  standalone: true,
  imports: [NgFor, NgIf, NgStyle],
  templateUrl: './confetti.component.html',
  styleUrl:    './confetti.component.scss',
})
export class ConfettiComponent implements OnChanges {
  /** Pass true to trigger a burst, false to clear */
  active = input<boolean>(false);

  pieces: ConfettiPiece[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['active']) {
      if (this.active()) {
        this.generatePieces();
      } else {
        // Delay clearing so the fall animation can finish
        setTimeout(() => (this.pieces = []), 4000);
      }
    }
  }

  private generatePieces(): void {
    this.pieces = Array.from({ length: 80 }, (_, id) => {
      const isCircle = Math.random() > 0.5;
      const size     = 6 + Math.random() * 9;
      return {
        id,
        x:        Math.random() * 100,
        delay:    Math.random() * 1.8,
        dur:      2.2 + Math.random() * 2,
        size,
        height:   isCircle ? size : size / 2.5,
        isCircle,
        color:    COLORS[Math.floor(Math.random() * COLORS.length)],
        rotate:   Math.random() * 360,
      };
    });
  }
}