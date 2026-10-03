import React from 'react';
import { usePizzeria } from '../context/PizzeriaContext';
import { PIZZAS } from '../data/pizzeriaData';
import { MapPin, Phone, Clock, Flame, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo } = usePizzeria();

  return (
    <footer className="bg-black text-white border-t-4 border-black">
      {/* Top Banner */}
      <div className="border-b border-neutral-800 py-8 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-white text-[#c92a2a] flex items-center justify-center font-black">
                <Flame className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-heading font-black text-base uppercase">HORNO DE LEÑA 480°C</h4>
                <p className="text-xs text-gray-400">Cocción rápida tradicional en 80 segundos</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-white text-black flex items-center justify-center font-black">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-heading font-black text-base uppercase">MASA MADRE 48 HORAS</h4>
                <p className="text-xs text-gray-400">Fermentación lenta y digestibilidad máxima</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-white text-[#234919] flex items-center justify-center font-black">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-heading font-black text-base uppercase">CALIDAD D.O.P. ITALIANA</h4>
                <p className="text-xs text-gray-400">Tomates San Marzano y mozzarella di bufala</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo & Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="inline-block bg-white px-3 py-1 rounded-lg">
              <span className="font-heading font-black text-2xl text-[#c92a2a] leading-none">PI</span>
              <span className="font-heading font-black text-2xl text-[#234919] leading-none">ZZA</span>
            </div>
            <p className="text-xs text-gray-400 max-w-sm leading-relaxed">
              Auténtica pizzería artesanal. Masa madre viva de 48 horas, 4 recetas legendarias elaboradas a mano en 3 tamaños y refrescos tradicionales.
            </p>
          </div>

          {/* 4 Pizzas dedicated links */}
          <div className="space-y-3">
            <h5 className="font-heading font-black text-xs uppercase tracking-wider text-gray-300">
              NUESTRAS 4 PIZZAS
            </h5>
            <ul className="space-y-2 text-xs font-medium">
              {PIZZAS.map(p => (
                <li key={p.id}>
                  <button
                    onClick={() => navigateTo('pizza-detail', p.slug)}
                    className="text-gray-400 hover:text-white transition-colors text-left"
                  >
                    {p.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h5 className="font-heading font-black text-xs uppercase tracking-wider text-gray-300">
              EXPLORAR
            </h5>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <button onClick={() => navigateTo('home')} className="text-gray-400 hover:text-white transition-colors">
                  Inicio
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('menu')} className="text-gray-400 hover:text-white transition-colors">
                  Menú & Refrescos
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('reservas')} className="text-gray-400 hover:text-white transition-colors">
                  Reservar Mesa
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contacto')} className="text-gray-400 hover:text-white transition-colors">
                  Contacto y Ubicación
                </button>
              </li>
            </ul>
          </div>

          {/* Location & Hours */}
          <div className="space-y-3">
            <h5 className="font-heading font-black text-xs uppercase tracking-wider text-gray-300">
              VISÍTANOS
            </h5>
            <div className="space-y-2 text-xs text-gray-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#c92a2a] shrink-0 mt-0.5" />
                <span>Via Della Spiga 42, Centro</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#234919] shrink-0" />
                <span>+34 912 345 678</span>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <span>13:00 - 16:30 · 19:30 - 23:30</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-3">
          <p>© {new Date().getFullYear()} PIZZA. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4">
            <button onClick={() => navigateTo('contacto')} className="hover:text-gray-300">Aviso Legal</button>
            <span>·</span>
            <button onClick={() => navigateTo('contacto')} className="hover:text-gray-300">Alérgenos</button>
            <span>·</span>
            <button onClick={() => navigateTo('contacto')} className="hover:text-gray-300">Privacidad</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
