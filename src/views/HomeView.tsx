import React from 'react';
import { usePizzeria } from '../context/PizzeriaContext';
import { PIZZAS, BEVERAGES } from '../data/pizzeriaData';
import { ArrowRight, Flame, Clock, ShieldCheck, GlassWater, Sparkles, Check } from 'lucide-react';

export const HomeView: React.FC = () => {
  const { navigateTo, addToCart } = usePizzeria();

  return (
    <div className="space-y-20 pb-20 bg-[#fafafa]">
      {/* HERO SECTION MATCHING USER'S IMAGE REFERENCE */}
      <section className="relative overflow-hidden bg-white py-12 lg:py-20 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left / Center visual composition: Pizza on board with artistic brushstrokes & basil */}
            <div className="lg:col-span-7 relative flex items-center justify-center min-h-[420px] sm:min-h-[500px]">
              {/* Green Brushstroke (top-left) */}
              <div 
                className="absolute top-4 left-6 sm:left-12 w-28 sm:w-44 h-10 sm:h-14 bg-[#234919] -rotate-45 rounded-full blur-[0.5px] opacity-90 transform pointer-events-none"
                style={{ clipPath: 'polygon(5% 0%, 95% 15%, 100% 70%, 85% 100%, 0% 80%)' }}
              />
              
              {/* Green small stroke / accent (top-right) */}
              <div 
                className="absolute top-8 right-8 sm:right-16 w-14 sm:w-20 h-4 sm:h-6 bg-[#234919] rotate-45 rounded-full opacity-80 pointer-events-none"
                style={{ clipPath: 'polygon(0% 20%, 90% 0%, 100% 75%, 20% 100%)' }}
              />

              {/* Red Brushstroke (bottom-left) */}
              <div 
                className="absolute bottom-4 left-4 sm:left-10 w-36 sm:w-56 h-12 sm:h-16 bg-[#c92a2a] -rotate-30 rounded-full blur-[0.5px] opacity-95 pointer-events-none"
                style={{ clipPath: 'polygon(0% 15%, 90% 0%, 100% 85%, 10% 100%)' }}
              />

              {/* Green stroke (bottom-right) */}
              <div 
                className="absolute bottom-6 right-10 sm:right-20 w-24 sm:w-36 h-8 sm:h-10 bg-[#234919] 30 rounded-full opacity-85 pointer-events-none"
                style={{ clipPath: 'polygon(10% 0%, 100% 30%, 85% 100%, 0% 70%)' }}
              />

              {/* Central Floating Pizza on Wooden Peel */}
              <div className="relative z-10 w-full max-w-[480px] sm:max-w-[540px] transition-transform duration-500 hover:scale-[1.02]">
                <img
                  src="/src/assets/images/hero_pizza_white_bg_1790992399249.jpg"
                  alt="Pizza artesanal en tabla de madera"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto drop-shadow-2xl rounded-2xl"
                />
              </div>
            </div>

            {/* Right Card: Pitch-Black High-Contrast Box from Reference */}
            <div className="lg:col-span-5 flex justify-center lg:justify-start">
              <div className="w-full max-w-md bg-black text-white p-8 sm:p-10 rounded-3xl shadow-2xl space-y-6">
                <div className="space-y-2">
                  <h1 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight uppercase leading-none">
                    CONSIGUE TU
                  </h1>

                  {/* White badge with bold green PIZZA text */}
                  <div className="inline-block bg-white px-5 py-1.5 rounded-xl shadow">
                    <span className="font-heading font-black italic tracking-widest text-2xl sm:text-3xl lg:text-4xl text-[#234919] leading-none">
                      PIZZA
                    </span>
                  </div>
                </div>

                <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-normal">
                  Tu próxima pizza favorita está aquí, lista para disfrutarla como quieras.
                </p>

                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <button
                    onClick={() => navigateTo('menu')}
                    className="bg-white text-[#c92a2a] hover:bg-neutral-100 px-8 py-3 rounded-lg font-heading font-black tracking-wider uppercase text-sm transition-all shadow-md text-center"
                  >
                    MENÚ
                  </button>

                  <button
                    onClick={() => navigateTo('reservas')}
                    className="bg-[#234919] hover:bg-[#1a3813] text-white px-6 py-3 rounded-lg font-heading font-black tracking-wider uppercase text-sm transition-all text-center"
                  >
                    RESERVAR MESA
                  </button>
                </div>

                {/* Subtext info */}
                <div className="pt-3 border-t border-neutral-800 flex items-center justify-between text-[11px] text-gray-400 font-bold uppercase tracking-wider">
                  <span>4 VARIEDADES</span>
                  <span>·</span>
                  <span>3 TAMAÑOS</span>
                  <span>·</span>
                  <span>REFRESCOS ITALIANOS</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* PILLARS / BADGES STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border-2 border-black p-6 rounded-2xl shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center text-[#c92a2a] shrink-0">
              <Flame className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-heading font-black text-lg text-black uppercase">
                Horno de Leña a 480°C
              </h3>
              <p className="text-xs text-gray-600 mt-0.5">
                Cocción rápida tradicional en 80 segundos con leña de haya natural.
              </p>
            </div>
          </div>

          <div className="bg-white border-2 border-black p-6 rounded-2xl shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center text-white shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-heading font-black text-lg text-black uppercase">
                Masa Madre 48 Horas
              </h3>
              <p className="text-xs text-gray-600 mt-0.5">
                Fermentación lenta y controlada para una digestibilidad ligera y esponjosa.
              </p>
            </div>
          </div>

          <div className="bg-white border-2 border-black p-6 rounded-2xl shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center text-[#234919] shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-heading font-black text-lg text-black uppercase">
                Ingredientes D.O.P.
              </h3>
              <p className="text-xs text-gray-600 mt-0.5">
                Tomate San Marzano, mozzarella di bufala y salumi importados de Italia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* THE 4 SIGNATURE PIZZAS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-2 border-black pb-4">
          <div>
            <span className="bg-black text-white text-[11px] font-heading font-black uppercase tracking-wider px-3 py-1 rounded">
              NUESTRA CARTA
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-black uppercase tracking-tight mt-2">
              LAS 4 PIZZAS DE AUTOR
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 max-w-xl mt-1">
              Cada pizza tiene su propia página dedicada y viene en 3 tamaños preparados para ti: Individual (26cm), Mediana (33cm) y Familiar (40cm).
            </p>
          </div>

          <button
            onClick={() => navigateTo('menu')}
            className="inline-flex items-center gap-2 font-heading font-black text-xs uppercase tracking-wider text-[#c92a2a] hover:text-[#234919] transition-colors"
          >
            <span>Ver menú completo y refrescos</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PIZZAS.map(pizza => (
            <div
              key={pizza.id}
              className="bg-white border-2 border-black rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image */}
                <div
                  className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100 cursor-pointer"
                  onClick={() => navigateTo('pizza-detail', pizza.slug)}
                >
                  <img
                    src={pizza.image}
                    alt={pizza.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 rounded-md text-xs font-heading font-black uppercase tracking-wider">
                    {pizza.badge}
                  </div>
                  <div className="absolute bottom-4 right-4 bg-white text-black border border-black px-2.5 py-1 rounded-md text-xs font-bold tabular-nums">
                    ★ {pizza.rating.toFixed(2)}
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 sm:p-7 space-y-4">
                  <div>
                    <h3
                      onClick={() => navigateTo('pizza-detail', pizza.slug)}
                      className="font-heading font-black text-2xl text-black hover:text-[#c92a2a] transition-colors cursor-pointer uppercase tracking-tight"
                    >
                      {pizza.name}
                    </h3>
                    <p className="text-xs text-gray-500 italic mt-0.5">{pizza.italianName}</p>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed line-clamp-2">
                    {pizza.description}
                  </p>

                  {/* 3 Sizes Box */}
                  <div className="bg-neutral-50 rounded-2xl p-3.5 border border-neutral-200 space-y-2">
                    <span className="text-[10px] font-heading font-black uppercase tracking-wider text-gray-500 block">
                      3 TAMAÑOS DISPONIBLES:
                    </span>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      {pizza.sizes.map(size => (
                        <div key={size.id} className="bg-white p-2 rounded-xl border border-neutral-200">
                          <p className="font-heading font-black text-xs text-black uppercase">{size.name}</p>
                          <p className="text-[10px] text-gray-500">{size.diameter}</p>
                          <p className="text-xs font-bold text-[#c92a2a] mt-0.5 tabular-nums">
                            {size.price.toFixed(2)}€
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="p-6 sm:p-7 pt-0 flex items-center gap-3">
                <button
                  onClick={() => navigateTo('pizza-detail', pizza.slug)}
                  className="flex-1 py-3 px-4 bg-white border-2 border-black hover:bg-neutral-100 text-black rounded-xl font-heading font-black text-xs uppercase tracking-wider transition-colors text-center"
                >
                  VER PÁGINA DE ESTA PIZZA
                </button>

                <button
                  onClick={() => {
                    addToCart({
                      type: 'pizza',
                      itemId: pizza.id,
                      name: pizza.name,
                      sizeId: 'mediana',
                      sizeName: 'Mediana (33 cm)',
                      doughName: 'Masa Madre Napolitana 48h',
                      unitPrice: pizza.sizes[1].price,
                      quantity: 1
                    });
                  }}
                  className="py-3 px-4 bg-[#c92a2a] hover:bg-[#b02222] text-white rounded-xl font-heading font-black text-xs uppercase tracking-wider transition-colors whitespace-nowrap shadow"
                >
                  PEDIR MEDIANA ({pizza.sizes[1].price.toFixed(2)}€)
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* REFRESCOS & BEBIDAS BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-black text-white rounded-3xl p-8 sm:p-12 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-[#234919] bg-white px-3 py-1 rounded font-heading font-black text-xs uppercase tracking-widest">
                BEBIDAS & REFRESCOS
              </span>
              <h2 className="font-heading font-black text-3xl sm:text-4xl text-white uppercase tracking-tight">
                REFRESCOS ITALIANOS & SODA BAR
              </h2>
              <p className="text-xs sm:text-sm text-gray-300 max-w-xl">
                Acompaña tu pizza con Limonata BIO de Sicilia, Chinotto Lurisia, Aranciata Rossa y refrescos en botella de vidrio servidos bien fríos.
              </p>
            </div>

            <button
              onClick={() => navigateTo('menu')}
              className="bg-white text-black hover:bg-neutral-200 px-6 py-2.5 rounded-lg font-heading font-black text-xs uppercase tracking-wider transition-colors self-start md:self-auto"
            >
              VER TODOS LOS REFRESCOS
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {BEVERAGES.slice(0, 4).map(bev => (
              <div
                key={bev.id}
                className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-xs font-bold text-gray-400">{bev.volume}</span>
                    <span className="text-xs font-heading font-black text-[#c92a2a] tabular-nums">
                      {bev.price.toFixed(2)}€
                    </span>
                  </div>
                  <h4 className="font-heading font-black text-base text-white mt-1 uppercase">
                    {bev.name}
                  </h4>
                  <p className="text-xs text-gray-400 line-clamp-2 mt-1">{bev.description}</p>
                </div>

                <button
                  onClick={() => {
                    addToCart({
                      type: 'beverage',
                      itemId: bev.id,
                      name: bev.name,
                      unitPrice: bev.price,
                      quantity: 1
                    });
                  }}
                  className="w-full py-2 bg-neutral-800 hover:bg-[#234919] text-white rounded-lg text-xs font-heading font-black uppercase tracking-wider transition-colors"
                >
                  + AÑADIR AL PEDIDO
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RESERVATION CALLOUT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-4 border-black bg-white rounded-3xl p-8 sm:p-12 text-center space-y-4 shadow-lg">
          <div className="inline-block bg-[#234919] text-white px-4 py-1 rounded font-heading font-black text-xs uppercase tracking-widest">
            EXPERIENCIA EN RESTAURANTE
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-black uppercase tracking-tight">
            ¿PREFIERES DISFRUTARLA RECIÉN SALIDA DEL HORNO?
          </h2>
          <p className="text-sm text-gray-600 max-w-xl mx-auto">
            Reserva tu mesa en el salón junto al horno de leña o en la terraza al aire libre. Confirmación instantánea sin cargos de reserva.
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigateTo('reservas')}
              className="bg-[#c92a2a] hover:bg-[#b02222] text-white px-8 py-3.5 rounded-xl font-heading font-black text-xs uppercase tracking-wider transition-all shadow-md"
            >
              RESERVAR TU MESA ONLINE
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
