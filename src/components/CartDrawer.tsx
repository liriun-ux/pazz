import React, { useState } from 'react';
import { usePizzeria } from '../context/PizzeriaContext';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, CheckCircle2, Store, Bike, Utensils } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartTotal,
    navigateTo
  } = usePizzeria();

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderType, setOrderType] = useState<'recogida' | 'domicilio'>('recogida');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [orderSuccess, setOrderSuccess] = useState<{
    orderId: string;
    type: 'recogida' | 'domicilio';
    total: number;
    estimatedTime: string;
  } | null>(null);

  if (!isCartOpen) return null;

  const deliveryFee = orderType === 'domicilio' ? 2.50 : 0.00;
  const finalTotal = Number((cartTotal + deliveryFee).toFixed(2));

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || (orderType === 'domicilio' && !deliveryAddress)) {
      return;
    }

    const orderId = `PZ-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderSuccess({
      orderId,
      type: orderType,
      total: finalTotal,
      estimatedTime: orderType === 'recogida' ? '20-25 minutos' : '35-45 minutos'
    });
    clearCart();
    setIsCheckingOut(false);
  };

  const closeAll = () => {
    setIsCartOpen(false);
    setIsCheckingOut(false);
    setOrderSuccess(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeAll}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l-4 border-black text-black shadow-2xl flex flex-col">
          {/* Header */}
          <div className="px-6 py-5 bg-black text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#c92a2a]" />
              <h2 className="font-heading font-black text-lg uppercase tracking-wider">
                {orderSuccess ? 'CONFIRMACIÓN' : isCheckingOut ? 'TRAMITAR PEDIDO' : 'TU PEDIDO'}
              </h2>
            </div>
            <button
              onClick={closeAll}
              className="p-1 rounded-md text-gray-400 hover:text-white transition-colors"
              aria-label="Cerrar pedido"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {orderSuccess ? (
              <div className="text-center py-8 space-y-6">
                <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center mx-auto border-2 border-black">
                  <CheckCircle2 className="w-9 h-9 text-[#234919]" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs uppercase tracking-widest text-[#234919] font-heading font-black">
                    ¡PEDIDO MARCHANDO EN HORNO!
                  </span>
                  <h3 className="font-heading font-black text-3xl text-black">
                    {orderSuccess.orderId}
                  </h3>
                  <p className="text-xs text-gray-600">
                    Nuestros pizzeros ya están preparando tu masa fresca a 480°C.
                  </p>
                </div>

                <div className="bg-neutral-50 rounded-2xl p-4 border-2 border-black text-left text-xs space-y-2">
                  <div className="flex justify-between font-bold">
                    <span>Modalidad:</span>
                    <span className="capitalize">{orderSuccess.type}</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Tiempo estimado:</span>
                    <span className="text-[#c92a2a]">{orderSuccess.estimatedTime}</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Total a abonar:</span>
                    <span className="tabular-nums text-black">{orderSuccess.total.toFixed(2)}€</span>
                  </div>
                  <p className="text-[10px] text-gray-500 pt-1">
                    Te enviaremos el seguimiento por WhatsApp / SMS.
                  </p>
                </div>

                <button
                  onClick={closeAll}
                  className="w-full py-3 px-4 bg-black hover:bg-neutral-800 text-white font-heading font-black text-xs uppercase tracking-wider rounded-xl transition-colors"
                >
                  VOLVER A LA PIZZERÍA
                </button>
              </div>
            ) : isCheckingOut ? (
              <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-5">
                {/* Mode */}
                <div className="space-y-1.5">
                  <label className="text-xs font-heading font-black uppercase text-black">
                    MODALIDAD DE ENTREGA
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setOrderType('recogida')}
                      className={`py-3 px-3 rounded-xl border-2 text-xs font-heading font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all ${
                        orderType === 'recogida'
                          ? 'border-black bg-black text-white'
                          : 'border-neutral-300 bg-white text-gray-700 hover:border-black'
                      }`}
                    >
                      <Store className="w-4 h-4" />
                      <span>RECOGIDA (20m)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setOrderType('domicilio')}
                      className={`py-3 px-3 rounded-xl border-2 text-xs font-heading font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all ${
                        orderType === 'domicilio'
                          ? 'border-black bg-black text-white'
                          : 'border-neutral-300 bg-white text-gray-700 hover:border-black'
                      }`}
                    >
                      <Bike className="w-4 h-4" />
                      <span>ENVÍO (+2.50€)</span>
                    </button>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-heading font-black uppercase text-black mb-1">Nombre *</label>
                    <input
                      type="text"
                      required
                      placeholder="Tu nombre"
                      value={customerName}
                      onChange={e => setCustomerName(e.target.value)}
                      className="w-full bg-neutral-50 border-2 border-neutral-300 rounded-xl px-3.5 py-2.5 text-xs text-black focus:outline-none focus:border-black"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-heading font-black uppercase text-black mb-1">Teléfono *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+34 600 000 000"
                      value={customerPhone}
                      onChange={e => setCustomerPhone(e.target.value)}
                      className="w-full bg-neutral-50 border-2 border-neutral-300 rounded-xl px-3.5 py-2.5 text-xs text-black focus:outline-none focus:border-black"
                    />
                  </div>

                  {orderType === 'domicilio' && (
                    <div>
                      <label className="block text-xs font-heading font-black uppercase text-black mb-1">Dirección *</label>
                      <input
                        type="text"
                        required
                        placeholder="Calle, número, piso y puerta"
                        value={deliveryAddress}
                        onChange={e => setDeliveryAddress(e.target.value)}
                        className="w-full bg-neutral-50 border-2 border-neutral-300 rounded-xl px-3.5 py-2.5 text-xs text-black focus:outline-none focus:border-black"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-heading font-black uppercase text-black mb-1">Instrucciones</label>
                    <textarea
                      rows={2}
                      placeholder="Cortada en porciones, notas de timbre..."
                      value={orderNotes}
                      onChange={e => setOrderNotes(e.target.value)}
                      className="w-full bg-neutral-50 border-2 border-neutral-300 rounded-xl px-3.5 py-2 text-xs text-black focus:outline-none focus:border-black"
                    />
                  </div>
                </div>

                <div className="bg-neutral-100 p-3 rounded-xl border border-neutral-300 text-xs text-gray-700">
                  <p className="font-bold text-black">Pago al recibir:</p>
                  <p>En efectivo o tarjeta (datáfono contactless disponible).</p>
                </div>
              </form>
            ) : cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mx-auto text-gray-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-heading font-black text-black text-lg uppercase">Tu cesta está vacía</h3>
                  <p className="text-xs text-gray-500 mt-1 max-w-xs mx-auto">
                    Elige entre nuestras 4 pizzas artesanas con 3 tamaños y refrescos italianos.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigateTo('menu');
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-heading font-black uppercase tracking-wider text-white bg-black hover:bg-neutral-800 rounded-xl transition-colors"
                >
                  <Utensils className="w-3.5 h-3.5" />
                  <span>VER MENÚ</span>
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs font-bold pb-2 border-b border-neutral-200">
                  <span>{cart.length} {cart.length === 1 ? 'PRODUCTO' : 'PRODUCTOS'}</span>
                  <button
                    onClick={clearCart}
                    className="text-[#c92a2a] hover:underline"
                  >
                    Vaciar
                  </button>
                </div>

                <div className="space-y-3">
                  {cart.map(item => (
                    <div
                      key={item.id}
                      className="bg-neutral-50 border-2 border-neutral-200 rounded-2xl p-3.5 flex flex-col gap-2"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <h4 className="font-heading font-black text-sm text-black uppercase truncate">
                            {item.name}
                          </h4>
                          {item.sizeName && (
                            <p className="text-xs text-[#c92a2a] font-bold">
                              {item.sizeName}
                            </p>
                          )}
                          {item.doughName && (
                            <p className="text-[11px] text-gray-600 truncate">
                              {item.doughName}
                            </p>
                          )}
                          {item.extraIngredients && item.extraIngredients.length > 0 && (
                            <p className="text-[11px] text-gray-500 truncate">
                              + {item.extraIngredients.join(', ')}
                            </p>
                          )}
                        </div>

                        <div className="text-right">
                          <span className="font-heading font-black text-sm text-black tabular-nums">
                            {item.totalPrice.toFixed(2)}€
                          </span>
                          <p className="text-[10px] text-gray-500 tabular-nums">
                            {item.unitPrice.toFixed(2)}€/ud
                          </p>
                        </div>
                      </div>

                      {/* Controls */}
                      <div className="flex items-center justify-between pt-2 border-t border-neutral-200">
                        <div className="flex items-center gap-1.5 bg-white border border-neutral-300 rounded-lg p-0.5">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 hover:text-black text-gray-500"
                            aria-label="Menos"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-6 text-center text-xs font-black tabular-nums text-black">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 hover:text-black text-gray-500"
                            aria-label="Más"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1 text-gray-400 hover:text-[#c92a2a] transition-colors"
                          aria-label="Eliminar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && !orderSuccess && (
            <div className="p-6 border-t-2 border-black bg-neutral-50 space-y-3">
              <div className="space-y-1 text-xs text-gray-600 font-bold">
                <div className="flex justify-between">
                  <span>SUBTOTAL:</span>
                  <span className="tabular-nums text-black">{cartTotal.toFixed(2)}€</span>
                </div>
                {isCheckingOut && orderType === 'domicilio' && (
                  <div className="flex justify-between text-[#c92a2a]">
                    <span>GASTOS DE ENVÍO:</span>
                    <span className="tabular-nums">{deliveryFee.toFixed(2)}€</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-heading font-black text-black pt-1 border-t border-neutral-300">
                  <span>TOTAL:</span>
                  <span className="tabular-nums text-[#c92a2a] text-xl">
                    {finalTotal.toFixed(2)}€
                  </span>
                </div>
              </div>

              {isCheckingOut ? (
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setIsCheckingOut(false)}
                    className="py-3 px-3 border-2 border-black text-black rounded-xl font-heading font-black text-xs uppercase tracking-wider transition-colors"
                  >
                    VOLVER
                  </button>
                  <button
                    type="submit"
                    form="checkout-form"
                    className="py-3 px-3 bg-[#c92a2a] hover:bg-[#b02222] text-white rounded-xl font-heading font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1 shadow"
                  >
                    <span>CONFIRMAR</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsCheckingOut(true)}
                  className="w-full py-3.5 px-4 bg-black hover:bg-neutral-800 text-white font-heading font-black text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-all shadow"
                >
                  <span>TRAMITAR PEDIDO</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
