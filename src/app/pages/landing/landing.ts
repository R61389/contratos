import { Component, HostListener, signal } from '@angular/core';
import { RevealDirective } from '../../shared/reveal.directive';

interface Category {
  name: string;
  icon: 'music' | 'catering' | 'beer' | 'camera' | 'decor' | 'sound';
}

interface Provider {
  name: string;
  category: string;
  rating: number;
  priceFrom: string;
  featured?: boolean;
}

interface EventType {
  name: string;
  guests: string;
  gradient: string;
}

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RevealDirective],
  templateUrl: './landing.html',
})
export class Landing {
  readonly scrolled = signal(false);

  readonly categories: Category[] = [
    { name: 'Música & DJs', icon: 'music' },
    { name: 'Catering', icon: 'catering' },
    { name: 'Cervecería artesanal', icon: 'beer' },
    { name: 'Fotografía & Video', icon: 'camera' },
    { name: 'Decoración', icon: 'decor' },
    { name: 'Sonido & Iluminación', icon: 'sound' },
  ];

  readonly providers: Provider[] = [
    { name: '[Nombre del salón]', category: 'Salón de eventos · hasta 300 invitados', rating: 5, priceFrom: 'Bs [XXXX]', featured: true },
    { name: '[Grupo de cumbia]', category: 'Música', rating: 4.8, priceFrom: 'Bs [XXX] / evento' },
    { name: '[Catering gourmet]', category: 'Catering', rating: 4.9, priceFrom: 'Bs [XXX] / persona' },
    { name: '[Estudio fotográfico]', category: 'Fotografía', rating: 5, priceFrom: 'Bs [XXX] / hora' },
    { name: '[Cervecería artesanal]', category: 'Cervecería', rating: 4.7, priceFrom: 'Barril desde Bs [XXX]' },
  ];

  readonly events: EventType[] = [
    { name: 'Bodas', guests: '80–250 invitados', gradient: 'from-brand-orange/15' },
    { name: 'Cumpleaños XV', guests: '50–150 invitados', gradient: 'from-secondary/15' },
    { name: 'Corporativos', guests: '20–500 invitados', gradient: 'from-primary/15' },
    { name: 'Aniversarios', guests: '30–120 invitados', gradient: 'from-success/15' },
  ];

  readonly stats = [
    { value: '[350+]', label: 'proveedores verificados' },
    { value: '[1,200+]', label: 'eventos organizados' },
    { value: '4.9/5', label: 'valoración promedio' },
    { value: '15', label: 'categorías de servicio' },
  ];

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 40);
  }

  starsArray(rating: number): number[] {
    return Array.from({ length: Math.round(rating) });
  }
}
