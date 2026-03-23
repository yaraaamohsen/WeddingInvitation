import { Component, input, output, signal, AfterViewInit, ViewChildren, QueryList, ElementRef } from '@angular/core';

interface Circle {
  label: string;
  scratched: boolean;
}

const SCRATCH_THRESHOLD = 0.6;
const BRUSH_RADIUS = 22;

@Component({
  selector: 'app-scratch-reveal',
  standalone: true,
  templateUrl: './scratch-reveal.component.html',
  styleUrl: './scratch-reveal.component.scss',
})
export class ScratchRevealComponent implements AfterViewInit {
  dateParts = input.required<string[]>();
  allScratched = output<void>();

  circles = signal<Circle[]>([]);
  scratchedCount = signal(0);

  @ViewChildren('scratchCanvas')
  canvasRefs!: QueryList<ElementRef<HTMLCanvasElement>>;

  private drawing = false;

  ngAfterViewInit(): void {
    this.circles.set(this.dateParts().map((label) => ({ label, scratched: false })));
    setTimeout(() => this.initCanvases(), 0);
  }

  // ── Canvas init — draw scratch-gold.png instead of gradient ─────────
  private initCanvases(): void {
    this.canvasRefs.forEach((ref) => this.paintGoldImage(ref.nativeElement));
  }

  private paintGoldImage(canvas: HTMLCanvasElement): void {
    const ctx = canvas.getContext('2d')!;
    const img = new Image();
    img.src = 'assets/scratch-gold.png';

    img.onload = () => {
      // Draw the gold image clipped to the circle shape
      ctx.save();
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2 - 2, 0, Math.PI * 2);
      ctx.clip();
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      ctx.restore();

      // Switch to erase mode for scratching
      ctx.globalCompositeOperation = 'destination-out';
    };

    img.onerror = () => {
      // Fallback to gold gradient if image fails to load
      const cx = canvas.width / 2,
        cy = canvas.height / 2,
        r = canvas.width / 2 - 2;
      const grad = ctx.createRadialGradient(cx - r * 0.3, cy - r * 0.3, r * 0.05, cx, cy, r);
      grad.addColorStop(0, '#f5e090');
      grad.addColorStop(0.4, '#c9a84c');
      grad.addColorStop(1, '#8a6010');
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.globalCompositeOperation = 'destination-out';
    };
  }

  // ── Mouse events ─────────────────────────────────────────────────────
  onMouseDown(): void {
    this.drawing = true;
  }
  onMouseUp(): void {
    this.drawing = false;
  }
  onMouseLeave(): void {
    this.drawing = false;
  }

  onMouseMove(e: MouseEvent, index: number): void {
    if (!this.drawing) return;
    this.scratch(e.clientX, e.clientY, index);
  }

  // ── Touch events ─────────────────────────────────────────────────────
  onTouchStart(e: TouchEvent): void {
    e.preventDefault();
    this.drawing = true;
  }
  onTouchEnd(): void {
    this.drawing = false;
  }

  onTouchMove(e: TouchEvent, index: number): void {
    e.preventDefault();
    if (!e.touches.length) return;
    this.scratch(e.touches[0].clientX, e.touches[0].clientY, index);
  }

  // ── Core scratch logic ────────────────────────────────────────────────
  private scratch(clientX: number, clientY: number, index: number): void {
    const canvas = this.canvasRefs.get(index)?.nativeElement;
    if (!canvas || this.circles()[index].scratched) return;

    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d')!;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(clientX - rect.left, clientY - rect.top, BRUSH_RADIUS, 0, Math.PI * 2);
    ctx.fill();

    if (this.coverageExceeds(ctx, canvas, SCRATCH_THRESHOLD)) {
      this.markScratched(index);
    }
  }

  private coverageExceeds(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, threshold: number): boolean {
    const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let transparent = 0;
    for (let i = 3; i < data.length; i += 4) {
      if (data[i] < 128) transparent++;
    }
    return transparent / (canvas.width * canvas.height) > threshold;
  }

  private markScratched(index: number): void {
    this.circles.update((list) => list.map((c, i) => (i === index ? { ...c, scratched: true } : c)));
    const count = this.scratchedCount() + 1;
    this.scratchedCount.set(count);
    if (count === this.dateParts().length) {
      this.allScratched.emit();
    }
  }
}
