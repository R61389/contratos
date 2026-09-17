import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild, signal } from '@angular/core';
import { animate, inView, stagger } from 'motion';

interface CarouselProvider {
  name: string;
  category: string;
  blurb: string;
  rating: number;
  priceFrom: string;
  gradient: string;
  accent: string;
}

/**
 * Autoplaying, scroll-triggered provider spotlight built with `motion`
 * (motion.dev). Layered per the design proposal: background gradient (z-0),
 * ambient particles (z-10), content track (z-20), interaction controls (z-30).
 */
@Component({
  selector: 'app-provider-carousel',
  standalone: true,
  templateUrl: './provider-carousel.html',
})
export class ProviderCarousel implements AfterViewInit, OnDestroy {
  @ViewChild('sectionEl', { static: true }) sectionRef!: ElementRef<HTMLElement>;
  @ViewChild('trackEl', { static: true }) trackRef!: ElementRef<HTMLElement>;
  @ViewChild('cardsHost', { static: true }) cardsHostRef!: ElementRef<HTMLElement>;

  readonly providers: CarouselProvider[] = [
    {
      name: '[Banda Los Andinos]',
      category: 'Música en vivo',
      blurb: 'Cumbia, rock boliviano y covers — de 4 a 8 horas de fiesta con equipo propio.',
      rating: 5,
      priceFrom: 'Bs 2,800 / evento',
      gradient: 'from-[#F0B255]/25 via-[#F0B255]/5 to-transparent',
      accent: '#F0B255',
    },
    {
      name: '[Food Truck Andino]',
      category: 'Catering',
      blurb: 'Estación de comida en vivo para 80 a 300 invitados, con opción vegetariana.',
      rating: 4.8,
      priceFrom: 'Bs 45 / persona',
      gradient: 'from-[#FB8C6A]/25 via-[#FB8C6A]/5 to-transparent',
      accent: '#FB8C6A',
    },
    {
      name: '[Lente Cochala Films]',
      category: 'Fotografía & Video',
      blurb: 'Cobertura completa con dron, edición incluida y entrega en 48 horas.',
      rating: 4.9,
      priceFrom: 'Bs 1,500 / evento',
      gradient: 'from-[#5FB6EF]/25 via-[#5FB6EF]/5 to-transparent',
      accent: '#5FB6EF',
    },
    {
      name: '[Deco Floral Kolla]',
      category: 'Decoración',
      blurb: 'Escenografía floral, centros de mesa e iluminación ambiental a medida.',
      rating: 5,
      priceFrom: 'Bs 900 / mesa',
      gradient: 'from-[#34D399]/25 via-[#34D399]/5 to-transparent',
      accent: '#34D399',
    },
  ];

  readonly active = signal(0);
  readonly reducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  private autoplayId?: ReturnType<typeof setInterval>;
  private stopInView?: VoidFunction;
  private paused = false;
  private readonly autoplayMs = 4500;

  ngAfterViewInit(): void {
    const cards = Array.from(this.cardsHostRef.nativeElement.children) as HTMLElement[];

    this.stopInView = inView(
      this.sectionRef.nativeElement,
      () => {
        if (!this.reducedMotion) {
          animate(
            cards,
            { opacity: [0, 1], y: [28, 0] },
            { delay: stagger(0.08), duration: 0.5, ease: [0.16, 1, 0.3, 1] },
          );
        } else {
          for (const c of cards) {
            c.style.opacity = '1';
            c.style.transform = 'none';
          }
        }
        this.startAutoplay();
        return () => this.stopAutoplay();
      },
      { amount: 0.4 },
    );
  }

  ngOnDestroy(): void {
    this.stopAutoplay();
    this.stopInView?.();
  }

  goTo(index: number): void {
    const total = this.providers.length;
    this.active.set(((index % total) + total) % total);
    this.slideTo();
  }

  next(): void {
    this.goTo(this.active() + 1);
  }

  prev(): void {
    this.goTo(this.active() - 1);
  }

  pause(): void {
    this.paused = true;
  }

  resume(): void {
    this.paused = false;
  }

  starsArray(rating: number): number[] {
    return Array.from({ length: Math.round(rating) });
  }

  private slideTo(): void {
    const x = `-${this.active() * 100}%`;
    if (this.reducedMotion) {
      this.trackRef.nativeElement.style.transform = `translateX(${x})`;
      return;
    }
    animate(this.trackRef.nativeElement, { x }, { duration: 0.6, ease: [0.16, 1, 0.3, 1] });
  }

  private startAutoplay(): void {
    if (this.reducedMotion || this.autoplayId) return;
    this.autoplayId = setInterval(() => {
      if (!this.paused) this.next();
    }, this.autoplayMs);
  }

  private stopAutoplay(): void {
    if (this.autoplayId) {
      clearInterval(this.autoplayId);
      this.autoplayId = undefined;
    }
  }
}
