import React, { useState } from 'react';
import { usePizzeria } from '../context/PizzeriaContext';
import { ReservationData } from '../data/pizzeriaData';
import {
  Calendar as CalendarIcon,
  Users,
  Flame,
  CheckCircle2,
  Printer,
  ChevronRight,
  MapPin
} from 'lucide-react';

export const ReservationsView: React.FC = () => {
  const { addReservation } = usePizzeria();

  const today = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState<string>(today);
  const [shift, setShift] = useState<'almuerzo' | 'cena'>('cena');
  const [selectedTime, setSelectedTime] = useState<string>('21:00');
  const [guests, setGuests] = useState<number>(2);
  const [seatingArea, setSeatingArea] = useState<'horno' | 'terraza' | 'privada'>('horno');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');

  const [confirmedBooking, setConfirmedBooking] = useState<ReservationData | null>(null);

  const lunchSlots = ['13:00', '13:30', '14:00', '14:30', '15:00', '15:30'];
  const dinnerSlots = ['19:45', '20:15', '20:45', '21:15', '21:45', '22:15', '22:45'];

  const availableSlots = shift === 'almuerzo' ? lunchSlots : dinnerSlots;

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email || !selectedTime) return;

    const newRes = addReservation({
      name,
      phone,
      email,
      date: selectedDate,
      time: selectedTime,
      guests,
      shift,
      seatingArea,
      specialNotes
    });

    setConfirmedBooking(newRes);
  };

  const seatingNames = {
    horno: 'Salón Principal junto al Horno de Leña',
    terraza: 'Terraza al Aire Libre',
    privada: 'Rincón Íntimo Privado'
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-block bg-[#234919] text-white px-3 py-1 rounded text-xs font-heading font-black uppercase tracking-widest">
          RESERVAS DE SALA Y TERRAZA
        </div>
        <h1 className="font-heading font-black text-4xl sm:text-5xl text-black uppercase tracking-tight">
          RESERVA TU MESA ONLINE
        </h1>
        <p className="text-sm text-gray-600">
          Elige fecha, turno de comida o cena, y número de personas. Recibe tu pase de reserva de inmediato.
        </p>
      </div>

      {confirmedBooking ? (
        /* Confirmed Voucher Pass */
        <div className="max-w-xl mx-auto bg-white border-4 border-black rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-full bg-black text-[#234919] flex items-center justify-center mx-auto border-2 border-black">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
            <span className="text-xs uppercase tracking-widest text-[#234919] font-heading font-black">
              ¡RESERVA CONFIRMADA!
            </span>
            <h2 className="font-heading font-black text-3xl text-black uppercase">
              PASE DE RESERVA
            </h2>
            <p className="text-xs text-gray-500 font-bold">
              CÓDIGO: <span className="text-black bg-neutral-100 px-2 py-0.5 rounded border border-black">{confirmedBooking.id}</span>
            </p>
          </div>

          <div className="bg-neutral-50 rounded-2xl p-5 border-2 border-black space-y-3 text-xs">
            <div className="grid grid-cols-2 gap-4 pb-3 border-b border-neutral-300">
              <div>
                <span className="text-gray-500 uppercase text-[10px] font-bold block">Titular:</span>
                <span className="text-sm font-heading font-black text-black">{confirmedBooking.name}</span>
              </div>
              <div>
                <span className="text-gray-500 uppercase text-[10px] font-bold block">Comensales:</span>
                <span className="text-sm font-heading font-black text-[#c92a2a]">
                  {confirmedBooking.guests} {confirmedBooking.guests === 1 ? 'persona' : 'personas'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pb-3 border-b border-neutral-300">
              <div>
                <span className="text-gray-500 uppercase text-[10px] font-bold block">Fecha:</span>
                <span className="text-sm font-bold text-black">{confirmedBooking.date}</span>
              </div>
              <div>
                <span className="text-gray-500 uppercase text-[10px] font-bold block">Hora:</span>
                <span className="text-sm font-bold text-black">{confirmedBooking.time} hrs ({confirmedBooking.shift})</span>
              </div>
            </div>

            <div className="space-y-0.5 pb-2 border-b border-neutral-300">
              <span className="text-gray-500 uppercase text-[10px] font-bold block">Zona:</span>
              <span className="text-xs font-bold text-black">{seatingNames[confirmedBooking.seatingArea]}</span>
            </div>

            {confirmedBooking.specialNotes && (
              <div className="space-y-0.5">
                <span className="text-gray-500 uppercase text-[10px] font-bold block">Notas:</span>
                <span className="text-xs text-gray-700 italic">"{confirmedBooking.specialNotes}"</span>
              </div>
            )}

            <div className="pt-2 text-[11px] text-gray-600 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#c92a2a] shrink-0" />
              <span>Via Della Spiga 42 · Dispones de 15 min de cortesía</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => window.print()}
              className="flex-1 py-3 px-4 bg-neutral-100 hover:bg-neutral-200 border-2 border-black text-black rounded-xl font-heading font-black text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>IMPRIMIR PASE</span>
            </button>

            <button
              onClick={() => {
                setConfirmedBooking(null);
                setName('');
                setPhone('');
                setEmail('');
                setSpecialNotes('');
              }}
              className="flex-1 py-3 px-4 bg-black hover:bg-neutral-800 text-white rounded-xl font-heading font-black text-xs uppercase tracking-wider transition-colors text-center"
            >
              NUEVA RESERVA
            </button>
          </div>
        </div>
      ) : (
        /* Reservation Form */
        <form
          onSubmit={handleBookingSubmit}
          className="bg-white border-2 border-black rounded-3xl p-6 sm:p-10 shadow-lg space-y-8"
        >
          {/* STEP 1 */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-black font-heading font-black text-lg uppercase border-b-2 border-black pb-2">
              <CalendarIcon className="w-5 h-5 text-[#c92a2a]" />
              <h3>1. FECHA Y TURNO</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-heading font-black uppercase text-black mb-1.5">
                  Elige el día *
                </label>
                <input
                  type="date"
                  min={today}
                  required
                  value={selectedDate}
                  onChange={e => setSelectedDate(e.target.value)}
                  className="w-full bg-neutral-50 border-2 border-neutral-300 rounded-xl px-4 py-2.5 text-xs text-black font-medium focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-xs font-heading font-black uppercase text-black mb-1.5">
                  Turno *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShift('almuerzo');
                      setSelectedTime(lunchSlots[1]);
                    }}
                    className={`py-2.5 px-3 rounded-xl border-2 text-xs font-heading font-black uppercase tracking-wider transition-all ${
                      shift === 'almuerzo'
                        ? 'border-black bg-black text-white'
                        : 'border-neutral-300 bg-white text-gray-700 hover:border-black'
                    }`}
                  >
                    Almuerzo (13:00 - 16:00)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShift('cena');
                      setSelectedTime(dinnerSlots[2]);
                    }}
                    className={`py-2.5 px-3 rounded-xl border-2 text-xs font-heading font-black uppercase tracking-wider transition-all ${
                      shift === 'cena'
                        ? 'border-black bg-black text-white'
                        : 'border-neutral-300 bg-white text-gray-700 hover:border-black'
                    }`}
                  >
                    Cena (19:45 - 23:00)
                  </button>
                </div>
              </div>
            </div>

            {/* Time Slots */}
            <div className="space-y-1.5">
              <label className="block text-xs font-heading font-black uppercase text-gray-600">
                Horas disponibles para {shift} ({selectedDate}):
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {availableSlots.map(slot => {
                  const isSelected = selectedTime === slot;
                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedTime(slot)}
                      className={`py-2 px-2 rounded-xl border-2 text-xs font-bold transition-all ${
                        isSelected
                          ? 'border-black bg-[#c92a2a] text-white shadow'
                          : 'border-neutral-200 bg-neutral-50 text-gray-700 hover:border-black'
                      }`}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* STEP 2 */}
          <div className="space-y-4 pt-4 border-t-2 border-black">
            <div className="flex items-center gap-2 text-black font-heading font-black text-lg uppercase border-b-2 border-black pb-2">
              <Users className="w-5 h-5 text-[#234919]" />
              <h3>2. NÚMERO DE COMENSALES</h3>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 10].map(num => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setGuests(num)}
                  className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center text-sm font-heading font-black transition-all shrink-0 ${
                    guests === num
                      ? 'border-black bg-black text-white shadow'
                      : 'border-neutral-300 bg-white text-gray-800 hover:border-black'
                  }`}
                >
                  {num}
                </button>
              ))}
              <span className="text-xs font-bold text-gray-500 pl-2">
                personas
              </span>
            </div>
          </div>

          {/* STEP 3 */}
          <div className="space-y-4 pt-4 border-t-2 border-black">
            <div className="flex items-center gap-2 text-black font-heading font-black text-lg uppercase border-b-2 border-black pb-2">
              <Flame className="w-5 h-5 text-[#c92a2a]" />
              <h3>3. ZONA DEL RESTAURANTE</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setSeatingArea('horno')}
                className={`p-4 rounded-2xl border-2 text-left transition-all ${
                  seatingArea === 'horno'
                    ? 'border-black bg-neutral-100 shadow-md'
                    : 'border-neutral-200 bg-white text-gray-700 hover:border-black'
                }`}
              >
                <div className="font-heading font-black text-xs uppercase text-black">Junto al Horno de Leña</div>
                <p className="text-[11px] text-gray-600 mt-1 leading-snug">
                  Ambiente acogedor con vista en vivo a la elaboración y horneado de pizzas.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setSeatingArea('terraza')}
                className={`p-4 rounded-2xl border-2 text-left transition-all ${
                  seatingArea === 'terraza'
                    ? 'border-black bg-neutral-100 shadow-md'
                    : 'border-neutral-200 bg-white text-gray-700 hover:border-black'
                }`}
              >
                <div className="font-heading font-black text-xs uppercase text-black">Terraza al Aire Libre</div>
                <p className="text-[11px] text-gray-600 mt-1 leading-snug">
                  Calle peatonal tranquila, con sombrillas y calefactores nocturnos.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setSeatingArea('privada')}
                className={`p-4 rounded-2xl border-2 text-left transition-all ${
                  seatingArea === 'privada'
                    ? 'border-black bg-neutral-100 shadow-md'
                    : 'border-neutral-200 bg-white text-gray-700 hover:border-black'
                }`}
              >
                <div className="font-heading font-black text-xs uppercase text-black">Rincón Íntimo Privado</div>
                <p className="text-[11px] text-gray-600 mt-1 leading-snug">
                  Mesas reservadas para parejas o conversaciones tranquilas.
                </p>
              </button>
            </div>
          </div>

          {/* STEP 4 */}
          <div className="space-y-4 pt-4 border-t-2 border-black">
            <div className="flex items-center gap-2 text-black font-heading font-black text-lg uppercase border-b-2 border-black pb-2">
              <Users className="w-5 h-5 text-black" />
              <h3>4. DATOS DEL TITULAR</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-heading font-black uppercase text-black mb-1">Nombre *</label>
                <input
                  type="text"
                  required
                  placeholder="Tu nombre completo"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full bg-neutral-50 border-2 border-neutral-300 rounded-xl px-3.5 py-2.5 text-xs text-black focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-xs font-heading font-black uppercase text-black mb-1">Teléfono *</label>
                <input
                  type="tel"
                  required
                  placeholder="+34 600 000 000"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full bg-neutral-50 border-2 border-neutral-300 rounded-xl px-3.5 py-2.5 text-xs text-black focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-xs font-heading font-black uppercase text-black mb-1">Email *</label>
                <input
                  type="email"
                  required
                  placeholder="tu@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-neutral-50 border-2 border-neutral-300 rounded-xl px-3.5 py-2.5 text-xs text-black focus:outline-none focus:border-black"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-heading font-black uppercase text-black mb-1">
                Peticiones especiales o intolerancias (opcional)
              </label>
              <textarea
                rows={2}
                placeholder="Cumpleaños, intolerancia a la lactosa, trona para bebé..."
                value={specialNotes}
                onChange={e => setSpecialNotes(e.target.value)}
                className="w-full bg-neutral-50 border-2 border-neutral-300 rounded-xl px-3.5 py-2 text-xs text-black focus:outline-none focus:border-black"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4 border-t-2 border-black flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-gray-500 font-medium">
              15 min de cortesía. Cancelación gratuita en cualquier momento.
            </span>

            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3.5 bg-black hover:bg-neutral-800 text-white font-heading font-black text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>CONFIRMAR RESERVA</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
