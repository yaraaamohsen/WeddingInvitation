import { Component, input, output, signal, AfterViewInit, ViewChildren, QueryList, ElementRef } from '@angular/core';

interface Circle {
  label: string;
  scratched: boolean;
}

// How much of the gold surface must be erased before we count it as "scratched"
const SCRATCH_THRESHOLD = 0.6;
// Radius of the eraser brush in px
const BRUSH_RADIUS = 22;

@Component({
  selector: 'app-scratch-reveal',
  standalone: true,
  templateUrl: './scratch-reveal.component.html',
  styleUrl: './scratch-reveal.component.scss',
})
export class ScratchRevealComponent implements AfterViewInit {
  // ── Inputs / Outputs ───────────────────────────────────────────────
  dateParts = input.required<string[]>(); // ['10', 'Sept', '2027']
  allScratched = output<void>();

  // ── State ──────────────────────────────────────────────────────────
  circles = signal<Circle[]>([]);
  scratchedCount = signal(0);

  // ── Canvas refs ────────────────────────────────────────────────────
  @ViewChildren('scratchCanvas')
  canvasRefs!: QueryList<ElementRef<HTMLCanvasElement>>;

  private drawing = false;

  // ── Lifecycle ──────────────────────────────────────────────────────
  ngAfterViewInit(): void {
    this.circles.set(this.dateParts().map((label) => ({ label, scratched: false })));
    // Wait one tick for *ngFor to render the canvases
    setTimeout(() => this.initCanvases(), 0);
  }

  // ── Canvas setup ───────────────────────────────────────────────────

  /** Paint the gold radial gradient on every canvas */
  private initCanvases(): void {
    this.canvasRefs.forEach((ref) => this.paintGold(ref.nativeElement));
  }

  private paintGold(canvas: HTMLCanvasElement): void {
    const ctx = canvas.getContext('2d')!;
    const { width: w, height: h } = canvas;
    const cx = w / 2,
      cy = h / 2,
      r = w / 2 - 2;

    // Radial gold gradient — matches the original design
    const grad = ctx.createRadialGradient(cx - r * 0.3, cy - r * 0.3, r * 0.05, cx, cy, r);
    grad.addColorStop(0, '#f5e090');
    grad.addColorStop(0.3, '#d4a843');
    grad.addColorStop(0.6, '#b8862e');
    grad.addColorStop(1, '#8a6010');

    // Draw filled circle with gradient
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();

    // Switch to "erase" mode so subsequent draws punch holes in the gold
    ctx.globalCompositeOperation = 'destination-out';
  }

  // ── Mouse events ───────────────────────────────────────────────────
  onMouseDown(): void {
    this.drawing = true;
  }
  onMouseUp(): void {
    this.drawing = false;
  }
  onMouseLeave(): void {
    this.drawing = false;
  }

  onMouseMove(event: MouseEvent, index: number): void {
    if (!this.drawing) return;
    this.scratch(event.clientX, event.clientY, index);
  }

  // ── Touch events ───────────────────────────────────────────────────
  onTouchStart(event: TouchEvent): void {
    event.preventDefault(); // prevents scroll while scratching
    this.drawing = true;
  }
  onTouchEnd(): void {
    this.drawing = false;
  }

  onTouchMove(event: TouchEvent, index: number): void {
    event.preventDefault();
    if (!event.touches.length) return;
    this.scratch(event.touches[0].clientX, event.touches[0].clientY, index);
  }

  // ── Core scratch logic ─────────────────────────────────────────────

  private scratch(clientX: number, clientY: number, index: number): void {
    const canvas = this.canvasRefs.get(index)?.nativeElement;
    if (!canvas || this.circles()[index].scratched) return;

    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d')!;

    // Erase a circle at the pointer position
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(clientX - rect.left, clientY - rect.top, BRUSH_RADIUS, 0, Math.PI * 2);
    ctx.fill();

    // Check if enough has been erased
    if (this.coverageExceeds(ctx, canvas, SCRATCH_THRESHOLD)) {
      this.markScratched(index);
    }
  }

  /**
   * Samples the canvas pixels and returns true when the fraction
   * of transparent pixels exceeds `threshold`.
   */
  private coverageExceeds(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, threshold: number): boolean {
    const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let transparent = 0;
    // Alpha channel is every 4th byte (index 3, 7, 11 …)
    for (let i = 3; i < data.length; i += 4) {
      if (data[i] < 128) transparent++;
    }
    return transparent / (canvas.width * canvas.height) > threshold;
  }

  private markScratched(index: number): void {
    // Immutably update the circles signal
    this.circles.update((list) => list.map((c, i) => (i === index ? { ...c, scratched: true } : c)));

    const count = this.scratchedCount() + 1;
    this.scratchedCount.set(count);

    if (count === this.dateParts().length) {
      this.allScratched.emit();
    }
  }
}
