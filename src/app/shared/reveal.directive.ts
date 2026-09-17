import { Directive, ElementRef, OnDestroy, OnInit, inject, input } from '@angular/core';

/**
 * Adds `.reveal` on host and toggles `.reveal-visible` once the element
 * crosses into the viewport. Pairs with the Scroll Reveal spec from the
 * design proposal (power2.out, 400-600ms, y offset 8-24px).
 */
@Directive({
  selector: '[appReveal]',
  standalone: true,
  host: { class: 'reveal' },
})
export class RevealDirective implements OnInit, OnDestroy {
  private readonly el = inject(ElementRef<HTMLElement>);
  private observer?: IntersectionObserver;
  readonly appRevealDelay = input(0, { alias: 'appRevealDelay' });

  ngOnInit(): void {
    const node = this.el.nativeElement;
    node.style.transitionDelay = `${this.appRevealDelay()}ms`;

    if (typeof IntersectionObserver === 'undefined') {
      node.classList.add('reveal-visible');
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            node.classList.add('reveal-visible');
            this.observer?.unobserve(node);
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' },
    );
    this.observer.observe(node);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
