import React, { useState } from 'react';
import { usePizzeria } from '../context/PizzeriaContext';
import { PIZZAS } from '../data/pizzeriaData';
import { ShoppingBag, Calendar, Menu as MenuIcon, X, ChevronDown } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentPage, currentPizzaSlug, navigateTo, cartCount, setIsCartOpen } = usePizzeria();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pizzaDropdownOpen, setPizzaDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-black border-b border-neutral-800 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Wordmark Badge with Red/Green PI-ZZA styling */}
        <div className="flex items-center">
          <button
            onClick={() => {
              navigateTo('home');
              setMobileMenuOpen(false);
            }}
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#234919] group"
            aria-label="Ir a Inicio"
          >
            <div className="bg-white px-3.5 py-1.5 rounded-lg border-2 border-white shadow flex items-center tracking-tighter">
              <span className="font-heading font-black text-2xl sm:text-3xl text-[#c92a2a] leading-none">
                PI
              </span>
              <span className="font-heading font-black text-2xl sm:text-3xl text-[#234919] leading-none">
                ZZA
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Bold uppercase navigation links matching user image */}
        <nav className="hidden lg:flex items-center gap-6 font-heading font-black text-sm tracking-wider uppercase">
          <button
            onClick={() => navigateTo('home')}
            className={`transition-all py-1.5 px-4 rounded-md ${
              currentPage === 'home'
                ? 'bg-[#234919] text-white shadow'
                : 'text-white hover:text-gray-300'
            }`}
          >
            INICIO
          </button>

          <button
            onClick={() => navigateTo('menu')}
            className={`transition-all py-1.5 px-4 rounded-md ${
              currentPage === 'menu'
                ? 'bg-[#234919] text-white shadow'
                : 'text-white hover:text-gray-300'
            }`}
          >
            MENÚ
          </button>

          {/* Dedicated 4 Pizzas Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setPizzaDropdownOpen(true)}
            onMouseLeave={() => setPizzaDropdownOpen(false)}
          >
            <button
              onClick={() => navigateTo('menu')}
              className={`flex items-center gap-1.5 transition-all py-1.5 px-4 rounded-md ${
                currentPage === 'pizza-detail'
                  ? 'bg-[#234919] text-white shadow'
                  : 'text-white hover:text-gray-300'
              }`}
            >
              <span>4 PIZZAS</span>
              <ChevronDown className="w-4 h-4 opacity-80" />
            </button>

            {pizzaDropdownOpen && (
              <div className="absolute top-full left-0 pt-2 w-72 z-50">
                <div className="bg-neutral-900 border border-neutral-700 rounded-xl shadow-2xl py-2 overflow-hidden">
                  <div className="px-4 py-2 text-[11px] text-gray-400 font-bold uppercase tracking-widest border-b border-neutral-800">
                    Páginas Individuales
                  </div>
                  {PIZZAS.map(pizza => (
                    <button
                      key={pizza.id}
                      onClick={() => {
                        navigateTo('pizza-detail', pizza.slug);
                        setPizzaDropdownOpen(false);
                      }}
                      className={`w-full px-4 py-2.5 text-left text-xs flex items-center justify-between hover:bg-neutral-800 transition-colors ${
                        currentPizzaSlug === pizza.slug ? 'text-[#c92a2a] font-bold bg-neutral-800/80' : 'text-gray-200'
                      }`}
                    >
                      <div className="truncate pr-2">
                        <p className="font-heading font-black text-sm truncate">{pizza.name}</p>
                        <p className="text-[11px] text-gray-400 truncate font-normal">{pizza.tagline}</p>
                      </div>
                      <span className="text-[11px] text-[#234919] bg-white px-2 py-0.5 rounded font-black tabular-nums whitespace-nowrap">
                        {pizza.sizes[0].price.toFixed(2)}€
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => navigateTo('reservas')}
            className={`transition-all py-1.5 px-4 rounded-md ${
              currentPage === 'reservas'
                ? 'bg-[#234919] text-white shadow'
                : 'text-white hover:text-gray-300'
            }`}
          >
            RESERVAS
          </button>

          <button
            onClick={() => navigateTo('contacto')}
            className={`transition-all py-1.5 px-4 rounded-md ${
              currentPage === 'contacto'
                ? 'bg-[#234919] text-white shadow'
                : 'text-white hover:text-gray-300'
            }`}
          >
            CONTACTO & UBICACIÓN
          </button>
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsCartOpen(true)}
            aria-label="Ver carrito"
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-neutral-800 hover:bg-neutral-700 text-white font-heading font-black text-xs tracking-wider uppercase transition-colors"
          >
            <ShoppingBag className="w-4 h-4 text-[#c92a2a]" />
            <span className="hidden sm:inline">PEDIDO</span>
            {cartCount > 0 && (
              <span className="bg-[#c92a2a] text-white text-xs font-bold px-1.5 py-0.2 rounded-full tabular-nums">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={() => navigateTo('reservas')}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-heading font-black uppercase tracking-wider text-white bg-[#c92a2a] hover:bg-[#b02222] rounded-md shadow transition-colors"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>RESERVAR MESA</span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white hover:text-gray-300 lg:hidden focus:outline-none"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-neutral-950 border-b border-neutral-800 px-4 pt-3 pb-6 space-y-3 font-heading font-black text-sm uppercase tracking-wider">
          <button
            onClick={() => {
              navigateTo('home');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-3 py-2.5 rounded-md transition-colors ${
              currentPage === 'home' ? 'bg-[#234919] text-white' : 'text-gray-200 hover:bg-neutral-900'
            }`}
          >
            INICIO
          </button>

          <button
            onClick={() => {
              navigateTo('menu');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-3 py-2.5 rounded-md transition-colors ${
              currentPage === 'menu' ? 'bg-[#234919] text-white' : 'text-gray-200 hover:bg-neutral-900'
            }`}
          >
            MENÚ & REFRESCOS
          </button>

          <div className="pl-3 pr-1 py-1 border-l-2 border-[#234919] ml-2 space-y-1">
            <span className="text-[10px] text-gray-400 font-bold tracking-widest block px-2 py-0.5">
              Páginas de las 4 Pizzas:
            </span>
            {PIZZAS.map(p => (
              <button
                key={p.id}
                onClick={() => {
                  navigateTo('pizza-detail', p.slug);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-2 py-1.5 rounded text-xs transition-colors flex justify-between items-center ${
                  currentPizzaSlug === p.slug ? 'text-[#c92a2a] font-bold' : 'text-gray-300 hover:text-white'
                }`}
              >
                <span>{p.name}</span>
                <span className="text-[10px] text-green-500 font-bold">3 TAMAÑOS</span>
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              navigateTo('reservas');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-3 py-2.5 rounded-md transition-colors ${
              currentPage === 'reservas' ? 'bg-[#234919] text-white' : 'text-gray-200 hover:bg-neutral-900'
            }`}
          >
            RESERVAS
          </button>

          <button
            onClick={() => {
              navigateTo('contacto');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-3 py-2.5 rounded-md transition-colors ${
              currentPage === 'contacto' ? 'bg-[#234919] text-white' : 'text-gray-200 hover:bg-neutral-900'
            }`}
          >
            CONTACTO & UBICACIÓN
          </button>
        </div>
      )}
    </header>
  );
};
