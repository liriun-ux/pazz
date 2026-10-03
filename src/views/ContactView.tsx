import React, { useState } from 'react';
import { usePizzeria } from '../context/PizzeriaContext';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Car,
  Navigation,
  Send,
  CheckCircle2,
  Calendar
} from 'lucide-react';

export const ContactView: React.FC = () => {
  const { navigateTo } = usePizzeria();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Consulta general',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setFormSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-block bg-black text-white px-3 py-1 rounded text-xs font-heading font-black uppercase tracking-widest">
          ENCUÉNTRANOS & CONTÁCTANOS
        </div>
        <h1 className="font-heading font-black text-4xl sm:text-5xl text-black uppercase tracking-tight">
          CONTACTO Y UBICACIÓN
        </h1>
        <p className="text-sm text-gray-600">
          En el centro neurálgico de la ciudad. Ven a disfrutar de una auténtica pizza con masa madre o haz tu pedido para llevar.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Coordinates Card */}
          <div className="bg-white border-2 border-black rounded-3xl p-6 sm:p-7 space-y-6 shadow-sm">
            <h3 className="font-heading font-black text-xl text-black uppercase">
              DATOS DE CONTACTO
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#c92a2a]" />
                </div>
                <div>
                  <span className="font-heading font-black text-sm text-black block uppercase">DIRECCIÓN</span>
                  <p className="text-gray-700 mt-0.5">Via Della Spiga 42, Distrito Centro</p>
                  <p className="text-gray-500 text-[11px]">28001 Barrio Gastronómico</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-[#234919]" />
                </div>
                <div>
                  <span className="font-heading font-black text-sm text-black block uppercase">TELÉFONO & WHATSAPP</span>
                  <p className="text-gray-700 mt-0.5">+34 912 345 678 (Sala & Reservas)</p>
                  <p className="text-[#234919] font-bold text-[11px]">+34 622 987 654 (WhatsApp Pedidos)</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="font-heading font-black text-sm text-black block uppercase">CORREO ELECTRÓNICO</span>
                  <p className="text-gray-700 mt-0.5">contacto@pizza-artesana.es</p>
                  <p className="text-gray-500 text-[11px]">pedidos@pizza-artesana.es</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => navigateTo('reservas')}
                className="w-full py-3 px-4 bg-[#c92a2a] hover:bg-[#b02222] text-white font-heading font-black text-xs uppercase tracking-wider rounded-xl shadow transition-colors flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>RESERVAR UNA MESA EN EL LOCAL</span>
              </button>
            </div>
          </div>

          {/* Schedule */}
          <div className="bg-white border-2 border-black rounded-3xl p-6 space-y-4 text-xs shadow-sm">
            <div className="flex items-center gap-2 font-heading font-black text-base uppercase text-black">
              <Clock className="w-5 h-5 text-[#234919]" />
              <h4>HORARIOS DE HORNO</h4>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between py-1.5 border-b border-gray-100">
                <span className="text-gray-600 font-medium">Lunes a Jueves:</span>
                <span className="font-bold text-black">13:00 - 16:30 · 19:30 - 23:30</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-100">
                <span className="text-gray-600 font-medium">Viernes y Sábados:</span>
                <span className="font-bold text-[#c92a2a]">13:00 - 16:30 · 19:30 - 00:30</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-gray-600 font-medium">Domingos:</span>
                <span className="font-bold text-black">13:00 - 23:30 (Continuo)</span>
              </div>
            </div>
          </div>

          {/* Access / Parking */}
          <div className="bg-white border-2 border-black rounded-3xl p-6 space-y-3 text-xs shadow-sm">
            <div className="flex items-center gap-2 font-heading font-black text-base uppercase text-black">
              <Car className="w-5 h-5 text-[#c92a2a]" />
              <h4>CÓMO LLEGAR Y PARKING</h4>
            </div>
            <p className="text-gray-700 leading-relaxed">
              <strong>Metro:</strong> Estación San Ferdinando a 2 minutos a pie.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>Parking Gratuito:</strong> 2 horas gratis en Parking Plaza Spiga presentando tu ticket.
            </p>
          </div>
        </div>

        {/* Right Column (7 cols): Map + Form */}
        <div className="lg:col-span-7 space-y-6">
          {/* Map */}
          <div className="bg-white border-2 border-black rounded-3xl overflow-hidden shadow-sm">
            <div className="p-4 bg-black text-white flex items-center justify-between">
              <div className="flex items-center gap-2 font-heading font-black text-xs uppercase tracking-wider">
                <Navigation className="w-4 h-4 text-[#c92a2a]" />
                <span>MAPA DE UBICACIÓN</span>
              </div>
              <span className="text-[11px] text-gray-400 font-bold uppercase">
                CALLE PEATONAL
              </span>
            </div>

            {/* Stylized vector map */}
            <div className="relative h-72 w-full bg-neutral-100 overflow-hidden flex items-center justify-center border-b border-black">
              <div className="absolute inset-0 opacity-40 bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] bg-[size:32px_32px]" />
              
              <div className="absolute w-full h-8 bg-neutral-200 top-1/2 -translate-y-1/2 flex items-center justify-around text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                <span>Via Garibaldi</span>
                <span>Via Della Spiga</span>
                <span>Corso Italia</span>
              </div>
              <div className="absolute h-full w-8 bg-neutral-200 left-1/2 -translate-x-1/2 flex flex-col items-center justify-around text-[9px] font-bold text-gray-500 uppercase tracking-widest [writing-mode:vertical-rl]">
                <span>Piazza Centrale</span>
              </div>

              {/* Pin */}
              <div className="relative z-10 flex flex-col items-center animate-bounce">
                <div className="bg-black text-white px-3.5 py-1.5 rounded-xl shadow-xl font-heading font-black text-xs uppercase flex items-center gap-1.5 border border-white">
                  <MapPin className="w-4 h-4 text-[#c92a2a] fill-current" />
                  <span>PIZZA</span>
                </div>
                <div className="w-2.5 h-2.5 bg-black rotate-45 -mt-1.5" />
              </div>
            </div>

            <div className="p-4 flex items-center justify-between text-xs text-gray-600">
              <span>Terraza exterior climatizada y salón interior con horno visible.</span>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="font-heading font-black text-black hover:text-[#c92a2a] uppercase"
              >
                ABRIR EN MAPS ↗
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white border-2 border-black rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
            <div>
              <h3 className="font-heading font-black text-2xl text-black uppercase tracking-tight">
                ENVÍANOS UN MENSAJE
              </h3>
              <p className="text-xs text-gray-600 mt-1">
                Para consultas de grupos, reservas de eventos o dudas sobre alérgenos.
              </p>
            </div>

            {formSubmitted ? (
              <div className="p-6 bg-green-50 border-2 border-[#234919] rounded-2xl text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#234919] text-white flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="font-heading font-black text-lg text-black uppercase">
                  ¡MENSAJE ENVIADO!
                </h4>
                <p className="text-xs text-gray-700 max-w-sm mx-auto">
                  Gracias {formData.name}, responderemos a tu correo {formData.email} en un plazo máximo de 2 horas.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setFormSubmitted(false);
                    setFormData({ name: '', email: '', phone: '', subject: 'Consulta general', message: '' });
                  }}
                  className="font-heading font-black text-xs uppercase text-[#234919] underline mt-2"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-heading font-black uppercase text-black mb-1">Nombre *</label>
                    <input
                      type="text"
                      required
                      placeholder="Tu nombre"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-neutral-50 border-2 border-neutral-300 rounded-xl px-3.5 py-2.5 text-xs text-black focus:outline-none focus:border-black"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-heading font-black uppercase text-black mb-1">Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="tu@email.com"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-neutral-50 border-2 border-neutral-300 rounded-xl px-3.5 py-2.5 text-xs text-black focus:outline-none focus:border-black"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-heading font-black uppercase text-black mb-1">Teléfono</label>
                    <input
                      type="tel"
                      placeholder="+34 600 000 000"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-neutral-50 border-2 border-neutral-300 rounded-xl px-3.5 py-2.5 text-xs text-black focus:outline-none focus:border-black"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-heading font-black uppercase text-black mb-1">Asunto</label>
                    <select
                      value={formData.subject}
                      onChange={e => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-neutral-50 border-2 border-neutral-300 rounded-xl px-3.5 py-2.5 text-xs text-black font-medium focus:outline-none focus:border-black"
                    >
                      <option value="Consulta general">Consulta general</option>
                      <option value="Eventos privados">Eventos privados</option>
                      <option value="Alérgenos y celiaquía">Alérgenos y celiaquía</option>
                      <option value="Proveedores">Proveedores</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-heading font-black uppercase text-black mb-1">Mensaje *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Escribe tu mensaje..."
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-neutral-50 border-2 border-neutral-300 rounded-xl px-3.5 py-2.5 text-xs text-black focus:outline-none focus:border-black"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-black hover:bg-neutral-800 text-white font-heading font-black text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2 shadow"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>ENVIAR MENSAJE</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
