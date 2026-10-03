import React, { useState } from 'react';
import { usePizzeria } from '../context/PizzeriaContext';
import { PIZZAS, BEVERAGES, PizzaSize } from '../data/pizzeriaData';
import {
  Flame,
  Clock,
  ArrowRight,
  ArrowLeft,
  Check,
  Plus,
  Minus,
  GlassWater,
  ShieldCheck,
  Star,
  ChevronRight
} from 'lucide-react';

export const PizzaDetailView: React.FC = () => {
  const { currentPizzaSlug, navigateTo, addToCart, setIsCartOpen } = usePizzeria();

  const pizza = PIZZAS.find(p => p.slug === currentPizzaSlug) || PIZZAS[0];

  const [selectedSizeId, setSelectedSizeId] = useState<'individual' | 'mediana' | 'familiar'>('mediana');
  const [selectedDoughId, setSelectedDoughId] = useState<string>(pizza.doughOptions[0].id);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [quantity, setQuantity] = useState<number>(1);
  const [addedNotice, setAddedNotice] = useState(false);

  const currentSize: PizzaSize = pizza.sizes.find(s => s.id === selectedSizeId) || pizza.sizes[1];
  const currentDough = pizza.doughOptions.find(d => d.id === selectedDoughId) || pizza.doughOptions[0];

  const extrasCost = selectedExtras.reduce((sum, extraId) => {
    const item = pizza.customExtras.find(e => e.id === extraId);
    return sum + (item ? item.price : 0);
  }, 0);

  const unitPrice = Number((currentSize.price + currentDough.extraPrice + extrasCost).toFixed(2));
  const totalPrice = Number((unitPrice * quantity).toFixed(2));

  const toggleExtra = (extraId: string) => {
    setSelectedExtras(prev =>
      prev.includes(extraId) ? prev.filter(id => id !== extraId) : [...prev, extraId]
    );
  };

  const handleAddToCart = () => {
    const extraNames = selectedExtras
      .map(id => pizza.customExtras.find(e => e.id === id)?.name)
      .filter((name): name is string => Boolean(name));

    addToCart({
      type: 'pizza',
      itemId: pizza.id,
      name: pizza.name,
      sizeId: currentSize.id,
      sizeName: `${currentSize.name} (${currentSize.diameter})`,
      doughName: currentDough.name,
      extraIngredients: extraNames,
      unitPrice: unitPrice,
      quantity: quantity
    });

    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2500);
  };

  const recommendedBev = BEVERAGES.find(b =>
    b.name.toLowerCase().includes('limonata') ||
    b.name.toLowerCase().includes('chinotto') ||
    b.name.toLowerCase().includes('aranciata')
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Breadcrumb & Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-black pb-4">
        <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
          <button onClick={() => navigateTo('home')} className="hover:text-black transition-colors">
            INICIO
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <button onClick={() => navigateTo('menu')} className="hover:text-black transition-colors">
            MENÚ
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#c92a2a]">{pizza.name}</span>
        </div>

        {/* 4 Pizzas Fast Switcher */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {PIZZAS.map(p => (
            <button
              key={p.id}
              onClick={() => {
                navigateTo('pizza-detail', p.slug);
                setSelectedExtras([]);
                setQuantity(1);
              }}
              className={`px-3 py-1 rounded-md text-xs font-heading font-black uppercase tracking-wider transition-colors whitespace-nowrap ${
                p.slug === pizza.slug
                  ? 'bg-black text-white'
                  : 'bg-white border border-black text-black hover:bg-neutral-100'
              }`}
            >
              {p.name.split(' ')[0]} {p.name.split(' ')[1] || ''}
            </button>
          ))}
        </div>
      </div>

      {/* Main 2-Column Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Visual Showcase */}
        <div className="lg:col-span-6 space-y-6">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-neutral-100 border-2 border-black shadow-lg">
            <img
              src={pizza.image}
              alt={pizza.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute top-4 left-4 bg-black text-white px-3.5 py-1.5 rounded-lg text-xs font-heading font-black uppercase tracking-wider">
              {pizza.badge}
            </div>
            <div className="absolute bottom-4 left-4 bg-white/95 text-black border border-black px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-[#c92a2a]" />
              <span>Horno a 480°C en 80 segundos</span>
            </div>
          </div>

          {/* Quick Specifications */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-white border-2 border-black p-3 rounded-2xl">
              <span className="text-[10px] font-heading font-black uppercase text-gray-500 block">Cocción</span>
              <span className="font-heading font-black text-sm text-black">{pizza.bakingSpec.temperature}</span>
            </div>
            <div className="bg-white border-2 border-black p-3 rounded-2xl">
              <span className="text-[10px] font-heading font-black uppercase text-gray-500 block">Fermentación</span>
              <span className="font-heading font-black text-sm text-black">48h Masa Madre</span>
            </div>
            <div className="bg-white border-2 border-black p-3 rounded-2xl">
              <span className="text-[10px] font-heading font-black uppercase text-gray-500 block">Valoración</span>
              <span className="font-heading font-black text-sm text-[#234919]">★ {pizza.rating} / 5</span>
            </div>
          </div>

          {/* Story Card */}
          <div className="bg-white border-2 border-black rounded-2xl p-5 space-y-2 text-xs leading-relaxed">
            <h4 className="font-heading font-black text-sm text-black uppercase tracking-wider">
              Historia y Tradición de esta Receta
            </h4>
            <p className="text-gray-700">{pizza.story}</p>
          </div>
        </div>

        {/* Right Column: Customization & Purchase */}
        <div className="lg:col-span-6 bg-white border-2 border-black rounded-3xl p-6 sm:p-8 space-y-6 shadow-md">
          {/* Header */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-heading font-black uppercase tracking-wider text-[#234919]">
                PÁGINA EXCLUSIVA DE ESTA PIZZA
              </span>
              <div className="flex items-center gap-1 font-bold text-xs text-black">
                <Star className="w-3.5 h-3.5 fill-[#c92a2a] text-[#c92a2a]" />
                <span>{pizza.rating}</span>
                <span className="text-gray-500">({pizza.reviewsCount} opiniones)</span>
              </div>
            </div>
            <h1 className="font-heading font-black text-3xl sm:text-4xl text-black uppercase tracking-tight">
              {pizza.name}
            </h1>
            <p className="text-xs text-gray-500 italic">{pizza.italianName}</p>
            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed pt-1">
              {pizza.description}
            </p>
          </div>

          {/* 1. SELECTOR DE LOS 3 TAMAÑOS */}
          <div className="space-y-3 pt-3 border-t-2 border-black">
            <div className="flex justify-between items-baseline">
              <label className="font-heading font-black text-xs uppercase tracking-wider text-black">
                1. ELIGE EL TAMAÑO (3 OPCIONES)
              </label>
              <span className="text-xs font-bold text-[#c92a2a]">
                {currentSize.serves} · {currentSize.slices} porciones
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              {pizza.sizes.map(size => {
                const isSelected = size.id === selectedSizeId;
                return (
                  <button
                    key={size.id}
                    type="button"
                    onClick={() => setSelectedSizeId(size.id)}
                    className={`py-3 px-3 rounded-2xl border-2 text-left transition-all ${
                      isSelected
                        ? 'border-black bg-black text-white shadow-md'
                        : 'border-neutral-200 bg-neutral-50 text-gray-700 hover:border-black'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-heading font-black text-xs uppercase">{size.name}</span>
                      {isSelected && <Check className="w-4 h-4 text-[#234919] bg-white rounded-full p-0.5" />}
                    </div>
                    <div className="text-[11px] opacity-80 mt-0.5">{size.diameter}</div>
                    <div className="text-[10px] opacity-70">{size.calories}</div>
                    <div className="text-sm font-heading font-black mt-1 tabular-nums">
                      {size.price.toFixed(2)}€
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. OPCIÓN DE MASA */}
          <div className="space-y-3 pt-3 border-t border-neutral-200">
            <label className="font-heading font-black text-xs uppercase tracking-wider text-black block">
              2. TIPO DE MASA Y BORDE
            </label>
            <div className="space-y-2">
              {pizza.doughOptions.map(dough => {
                const isSelected = dough.id === selectedDoughId;
                return (
                  <button
                    key={dough.id}
                    type="button"
                    onClick={() => setSelectedDoughId(dough.id)}
                    className={`w-full p-3 rounded-xl border-2 text-left flex items-center justify-between transition-all ${
                      isSelected
                        ? 'border-black bg-neutral-100 text-black font-semibold'
                        : 'border-neutral-200 bg-white text-gray-700 hover:border-neutral-400'
                    }`}
                  >
                    <div>
                      <p className="text-xs font-heading font-black uppercase text-black">{dough.name}</p>
                      <p className="text-[11px] text-gray-500 font-normal">{dough.description}</p>
                    </div>
                    <span className="text-xs font-heading font-black text-[#c92a2a] tabular-nums whitespace-nowrap ml-3">
                      {dough.extraPrice === 0 ? 'Incluido' : `+${dough.extraPrice.toFixed(2)}€`}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. EXTRAS */}
          <div className="space-y-3 pt-3 border-t border-neutral-200">
            <label className="font-heading font-black text-xs uppercase tracking-wider text-black block">
              3. EXTRAS E INGREDIENTES ADICIONALES
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {pizza.customExtras.map(extra => {
                const isChecked = selectedExtras.includes(extra.id);
                return (
                  <button
                    key={extra.id}
                    type="button"
                    onClick={() => toggleExtra(extra.id)}
                    className={`p-2.5 rounded-xl border-2 text-left text-xs flex items-center justify-between transition-all ${
                      isChecked
                        ? 'border-black bg-black text-white font-bold'
                        : 'border-neutral-200 bg-white text-gray-700 hover:border-black'
                    }`}
                  >
                    <span className="truncate pr-1 text-[11px]">{extra.name}</span>
                    <span className={`text-[11px] font-black tabular-nums shrink-0 ${isChecked ? 'text-white' : 'text-[#c92a2a]'}`}>
                      +{extra.price.toFixed(2)}€
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. TOTAL & ADD BUTTON */}
          <div className="pt-4 border-t-2 border-black space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-heading font-black uppercase text-gray-500 block">Por unidad:</span>
                <span className="text-sm font-bold text-gray-700 tabular-nums">
                  {unitPrice.toFixed(2)}€
                </span>
              </div>

              {/* Stepper */}
              <div className="flex items-center gap-2 bg-neutral-100 border-2 border-black rounded-xl p-1">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="p-1 hover:text-black text-gray-600 transition-colors"
                  aria-label="Reducir"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center text-sm font-black tabular-nums text-black">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="p-1 hover:text-black text-gray-600 transition-colors"
                  aria-label="Aumentar"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-heading font-black uppercase text-gray-500 block">Total a pagar:</span>
                <span className="text-2xl font-heading font-black text-black tabular-nums">
                  {totalPrice.toFixed(2)}€
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3.5 px-6 bg-[#c92a2a] hover:bg-[#b02222] text-white font-heading font-black text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>AÑADIR {quantity} {quantity === 1 ? 'PIZZA' : 'PIZZAS'} AL PEDIDO</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsCartOpen(true)}
                className="px-5 py-3.5 bg-black hover:bg-neutral-800 text-white rounded-xl font-heading font-black text-xs uppercase tracking-wider transition-colors"
              >
                CESTA
              </button>
            </div>

            {addedNotice && (
              <div className="p-3 bg-green-50 border-2 border-[#234919] text-[#234919] rounded-xl text-xs font-bold flex items-center justify-between">
                <span>✓ ¡Añadida a tu pedido con éxito!</span>
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="underline ml-2 uppercase font-black"
                >
                  Ver carrito
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recommended Pairing with Refresco */}
      <section className="bg-black text-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-heading font-black uppercase tracking-wider text-[#234919] bg-white px-2.5 py-0.5 rounded">
              <GlassWater className="w-3.5 h-3.5" />
              <span>MARIDAJE RECOMENDADO</span>
            </div>
            <h3 className="font-heading font-black text-2xl text-white uppercase mt-1">
              {pizza.pairingRecommendation.name}
            </h3>
            <p className="text-xs text-gray-300 max-w-2xl leading-relaxed">
              {pizza.pairingRecommendation.description}
            </p>
          </div>

          {recommendedBev && (
            <div className="flex items-center gap-4 bg-neutral-900 p-3 rounded-2xl border border-neutral-700 shrink-0">
              <div>
                <p className="text-xs font-heading font-black text-white uppercase">{recommendedBev.name}</p>
                <p className="text-xs text-[#c92a2a] font-black tabular-nums">
                  {recommendedBev.price.toFixed(2)}€
                </p>
              </div>
              <button
                onClick={() => {
                  addToCart({
                    type: 'beverage',
                    itemId: recommendedBev.id,
                    name: recommendedBev.name,
                    unitPrice: recommendedBev.price,
                    quantity: 1
                  });
                }}
                className="px-4 py-2 bg-white text-black hover:bg-neutral-200 text-xs font-heading font-black uppercase tracking-wider rounded-xl transition-colors"
              >
                + AÑADIR REFRESCO
              </button>
            </div>
          )}
        </div>
      </section>

      {/* D.O.P. Ingredients Table */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#234919]" />
          <h3 className="font-heading font-black text-2xl text-black uppercase tracking-tight">
            INGREDIENTES & PROCEDENCIA D.O.P.
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pizza.ingredients.map(ing => (
            <div
              key={ing.name}
              className="bg-white border-2 border-black rounded-2xl p-5 space-y-1"
            >
              <div className="flex items-baseline justify-between gap-2">
                <h4 className="font-heading font-black text-sm text-black uppercase">
                  {ing.name}
                </h4>
                {ing.dop && (
                  <span className="text-[10px] bg-[#234919] text-white px-2 py-0.5 rounded font-heading font-black uppercase">
                    D.O.P. ITALIA
                  </span>
                )}
              </div>
              <p className="text-[11px] font-bold text-[#c92a2a] uppercase">{ing.origin}</p>
              <p className="text-xs text-gray-600 leading-relaxed">{ing.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Switcher */}
      <div className="pt-6 border-t-2 border-black flex justify-between items-center text-xs">
        <button
          onClick={() => navigateTo('menu')}
          className="inline-flex items-center gap-2 font-heading font-black uppercase tracking-wider text-black hover:text-[#c92a2a] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>VOLVER AL MENÚ</span>
        </button>

        <button
          onClick={() => {
            const currentIndex = PIZZAS.findIndex(p => p.slug === pizza.slug);
            const nextIndex = (currentIndex + 1) % PIZZAS.length;
            navigateTo('pizza-detail', PIZZAS[nextIndex].slug);
          }}
          className="inline-flex items-center gap-2 font-heading font-black uppercase tracking-wider text-[#c92a2a] hover:text-[#234919] transition-colors"
        >
          <span>SIGUIENTE PIZZA</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
