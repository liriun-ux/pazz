import React, { useState } from 'react';
import { usePizzeria } from '../context/PizzeriaContext';
import { PIZZAS, BEVERAGES, ANTIPASTI_DESSERTS } from '../data/pizzeriaData';
import { GlassWater, ArrowRight, Search } from 'lucide-react';

export const MenuView: React.FC = () => {
  const { navigateTo, addToCart } = usePizzeria();
  const [activeTab, setActiveTab] = useState<'todo' | 'pizzas' | 'refrescos' | 'antipasti'>('todo');
  const [searchQuery, setSearchQuery] = useState('');

  // Selected size for each pizza
  const [selectedSizes, setSelectedSizes] = useState<Record<string, 'individual' | 'mediana' | 'familiar'>>({
    'margherita': 'mediana',
    'diavola': 'mediana',
    'quattro-formaggi': 'mediana',
    'prosciutto-funghi': 'mediana'
  });

  const handleSizeChange = (pizzaId: string, sizeId: 'individual' | 'mediana' | 'familiar') => {
    setSelectedSizes(prev => ({ ...prev, [pizzaId]: sizeId }));
  };

  const filteredPizzas = PIZZAS.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.ingredients.some(i => i.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredBeverages = BEVERAGES.filter(b =>
    b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredAntipasti = ANTIPASTI_DESSERTS.filter(a =>
    a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-block bg-black text-white px-3 py-1 rounded text-xs font-heading font-black uppercase tracking-widest">
          MENÚ Y CARTA COMPLETA
        </div>
        <h1 className="font-heading font-black text-4xl sm:text-5xl text-black uppercase tracking-tight">
          NUESTRAS 4 PIZZAS & REFRESCOS
        </h1>
        <p className="text-sm text-gray-600">
          Elige entre 3 tamaños por cada pizza (Individual 26cm, Mediana 33cm o Familiar 40cm), y disfruta de refrescos italianos auténticos.
        </p>
      </div>

      {/* Tabs and search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b-2 border-black pb-4">
        <div className="flex items-center gap-2 overflow-x-auto max-w-full">
          <button
            onClick={() => setActiveTab('todo')}
            className={`px-4 py-2 text-xs font-heading font-black uppercase tracking-wider rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'todo'
                ? 'bg-black text-white'
                : 'bg-white border-2 border-black text-black hover:bg-neutral-100'
            }`}
          >
            TODO EL MENÚ
          </button>

          <button
            onClick={() => setActiveTab('pizzas')}
            className={`px-4 py-2 text-xs font-heading font-black uppercase tracking-wider rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'pizzas'
                ? 'bg-black text-white'
                : 'bg-white border-2 border-black text-black hover:bg-neutral-100'
            }`}
          >
            4 PIZZAS (3 TAMAÑOS)
          </button>

          <button
            onClick={() => setActiveTab('refrescos')}
            className={`px-4 py-2 text-xs font-heading font-black uppercase tracking-wider rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'refrescos'
                ? 'bg-black text-white'
                : 'bg-white border-2 border-black text-black hover:bg-neutral-100'
            }`}
          >
            REFRESCOS & BEBIDAS
          </button>

          <button
            onClick={() => setActiveTab('antipasti')}
            className={`px-4 py-2 text-xs font-heading font-black uppercase tracking-wider rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'antipasti'
                ? 'bg-black text-white'
                : 'bg-white border-2 border-black text-black hover:bg-neutral-100'
            }`}
          >
            ENTRANTES & POSTRES
          </button>
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar pizza, refresco..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-white border-2 border-black rounded-lg pl-9 pr-4 py-2 text-xs font-medium text-black focus:outline-none focus:ring-2 focus:ring-[#234919]"
          />
        </div>
      </div>

      {/* 4 PIZZAS SECTION WITH 3 SIZES PER PIZZA */}
      {(activeTab === 'todo' || activeTab === 'pizzas') && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-heading font-black text-2xl text-black uppercase tracking-tight">
              4 TIPOS DE PIZZA (3 TAMAÑOS)
            </h2>
            <span className="text-xs font-bold text-gray-500 hidden sm:inline">
              Horneadas a 480°C con leña natural
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredPizzas.map(pizza => {
              const currentSizeId = selectedSizes[pizza.id] || 'mediana';
              const currentSizeObj = pizza.sizes.find(s => s.id === currentSizeId) || pizza.sizes[1];

              return (
                <div
                  key={pizza.id}
                  className="bg-white border-2 border-black rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between"
                >
                  <div>
                    {/* Header Image */}
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-100">
                      <img
                        src={pizza.image}
                        alt={pizza.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-center cursor-pointer hover:scale-105 transition-transform duration-500"
                        onClick={() => navigateTo('pizza-detail', pizza.slug)}
                      />
                      <div className="absolute top-3 left-3 bg-black text-white px-2.5 py-1 rounded text-xs font-heading font-black uppercase tracking-wider">
                        {pizza.badge}
                      </div>
                      <button
                        onClick={() => navigateTo('pizza-detail', pizza.slug)}
                        className="absolute bottom-3 right-3 bg-white text-black border border-black hover:bg-neutral-100 px-3 py-1.5 rounded-lg text-xs font-heading font-black uppercase tracking-wider transition-colors flex items-center gap-1 shadow"
                      >
                        <span>Página de esta pizza</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Details */}
                    <div className="p-6 space-y-4">
                      <div>
                        <h3
                          onClick={() => navigateTo('pizza-detail', pizza.slug)}
                          className="font-heading font-black text-2xl text-black hover:text-[#c92a2a] transition-colors cursor-pointer uppercase tracking-tight"
                        >
                          {pizza.name}
                        </h3>
                        <p className="text-xs text-gray-500 italic mt-0.5">{pizza.italianName}</p>
                      </div>

                      <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                        {pizza.description}
                      </p>

                      {/* 3 SIZES SELECTOR BUTTONS */}
                      <div className="bg-neutral-50 p-3.5 rounded-2xl border border-neutral-200 space-y-2">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-heading font-black uppercase tracking-wider text-gray-600 text-[10px]">
                            ELIGE EL TAMAÑO:
                          </span>
                          <span className="text-[#c92a2a] font-bold text-xs">
                            {currentSizeObj.diameter} · {currentSizeObj.serves} ({currentSizeObj.slices} porciones)
                          </span>
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                          {pizza.sizes.map(size => {
                            const isSelected = size.id === currentSizeId;
                            return (
                              <button
                                key={size.id}
                                type="button"
                                onClick={() => handleSizeChange(pizza.id, size.id)}
                                className={`py-2 px-2 rounded-xl text-xs font-bold border-2 transition-all ${
                                  isSelected
                                    ? 'bg-black text-white border-black shadow'
                                    : 'bg-white border-neutral-300 text-gray-700 hover:border-black'
                                }`}
                              >
                                <div className="font-heading font-black uppercase">{size.name}</div>
                                <div className="text-[10px] opacity-80">{size.diameter}</div>
                                <div className="text-xs font-black mt-0.5 tabular-nums">
                                  {size.price.toFixed(2)}€
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div className="p-6 pt-0 flex items-center justify-between gap-4 border-t border-neutral-200 mt-2">
                    <div>
                      <span className="text-[10px] text-gray-500 font-heading font-black uppercase block">
                        PRECIO:
                      </span>
                      <span className="text-2xl font-heading font-black text-black tabular-nums">
                        {currentSizeObj.price.toFixed(2)}€
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => navigateTo('pizza-detail', pizza.slug)}
                        className="px-3 py-2 text-xs font-heading font-black uppercase tracking-wider border-2 border-black rounded-lg text-black hover:bg-neutral-100 transition-colors"
                      >
                        PERSONALIZAR
                      </button>

                      <button
                        onClick={() => {
                          addToCart({
                            type: 'pizza',
                            itemId: pizza.id,
                            name: pizza.name,
                            sizeId: currentSizeObj.id,
                            sizeName: `${currentSizeObj.name} (${currentSizeObj.diameter})`,
                            doughName: 'Masa Madre Napolitana 48h',
                            unitPrice: currentSizeObj.price,
                            quantity: 1
                          });
                        }}
                        className="px-4 py-2 text-xs font-heading font-black uppercase tracking-wider text-white bg-[#c92a2a] hover:bg-[#b02222] rounded-lg transition-colors shadow"
                      >
                        AÑADIR {currentSizeObj.name}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* REFRESCOS & BEBIDAS */}
      {(activeTab === 'todo' || activeTab === 'refrescos') && (
        <section className="space-y-6 pt-4">
          <div className="border-t-2 border-black pt-8 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GlassWater className="w-5 h-5 text-[#234919]" />
              <h2 className="font-heading font-black text-2xl text-black uppercase tracking-tight">
                REFRESCOS & BEBIDAS
              </h2>
            </div>
            <span className="text-xs font-bold text-gray-500 hidden sm:inline">
              Refrescos italianos en vidrio bien fríos
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBeverages.map(bev => (
              <div
                key={bev.id}
                className="bg-white border-2 border-black rounded-2xl p-5 flex flex-col justify-between space-y-3 shadow-sm"
              >
                <div>
                  <div className="flex justify-between items-start gap-2">
                    <h4 className="font-heading font-black text-base text-black uppercase leading-tight">
                      {bev.name}
                    </h4>
                    <span className="text-sm font-heading font-black text-[#c92a2a] tabular-nums whitespace-nowrap">
                      {bev.price.toFixed(2)}€
                    </span>
                  </div>

                  <p className="text-[11px] font-bold text-[#234919] uppercase mt-0.5">
                    {bev.volume} · {bev.origin}
                  </p>

                  <p className="text-xs text-gray-600 leading-relaxed mt-1">
                    {bev.description}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-neutral-200">
                  <span className="text-[10px] font-bold text-gray-500 uppercase">
                    {bev.badge || 'Refresco Frío'}
                  </span>

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
                    className="px-3.5 py-1.5 bg-black hover:bg-[#234919] text-white text-xs font-heading font-black uppercase tracking-wider rounded-md transition-colors"
                  >
                    + AÑADIR
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ENTRANTES & POSTRES */}
      {(activeTab === 'todo' || activeTab === 'antipasti') && (
        <section className="space-y-6 pt-4">
          <div className="border-t-2 border-black pt-8">
            <h2 className="font-heading font-black text-2xl text-black uppercase tracking-tight">
              ENTRANTES & POSTRES CASEROS
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Recetas artesanales para abrir el apetito o culminar con dulce sabor italiano.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredAntipasti.map(item => (
              <div
                key={item.id}
                className="bg-white border-2 border-black rounded-2xl p-5 flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-heading font-black text-base text-black uppercase">
                      {item.name}
                    </h4>
                    <span className="text-sm font-heading font-black text-[#c92a2a] tabular-nums">
                      {item.price.toFixed(2)}€
                    </span>
                  </div>
                  <p className="text-[11px] font-bold text-[#234919] uppercase">{item.origin}</p>
                  <p className="text-xs text-gray-600 leading-relaxed mt-1">
                    {item.description}
                  </p>
                </div>

                <div className="pt-2 flex justify-end border-t border-neutral-200">
                  <button
                    onClick={() => {
                      addToCart({
                        type: 'extra',
                        itemId: item.id,
                        name: item.name,
                        unitPrice: item.price,
                        quantity: 1
                      });
                    }}
                    className="px-3.5 py-1.5 bg-black hover:bg-[#234919] text-white text-xs font-heading font-black uppercase tracking-wider rounded-md transition-colors"
                  >
                    + AÑADIR
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
