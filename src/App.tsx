import React from 'react';
import { PizzeriaProvider, usePizzeria } from './context/PizzeriaContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { HomeView } from './views/HomeView';
import { MenuView } from './views/MenuView';
import { PizzaDetailView } from './views/PizzaDetailView';
import { ContactView } from './views/ContactView';
import { ReservationsView } from './views/ReservationsView';
import { Check, X, ShoppingBag } from 'lucide-react';

const AppContent: React.FC = () => {
  const { currentPage, activeOrderNotice, dismissNotice, setIsCartOpen } = usePizzeria();

  const renderCurrentView = () => {
    switch (currentPage) {
      case 'home':
        return <HomeView />;
      case 'menu':
        return <MenuView />;
      case 'pizza-detail':
        return <PizzaDetailView />;
      case 'contacto':
        return <ContactView />;
      case 'reservas':
        return <ReservationsView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa] text-[#141414] selection:bg-[#c92a2a] selection:text-white">
      {/* Fixed Toast / Notice when item is added to cart */}
      {activeOrderNotice && (
        <div className="fixed bottom-6 right-6 z-50 bg-black text-white border-2 border-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-5">
          <div className="w-6 h-6 rounded-full bg-[#234919] flex items-center justify-center text-white shrink-0">
            <Check className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-heading font-black uppercase tracking-wider">{activeOrderNotice}</span>
          <button
            onClick={() => {
              dismissNotice();
              setIsCartOpen(true);
            }}
            className="text-xs font-heading font-black uppercase text-[#c92a2a] hover:underline ml-1"
          >
            Ver cesta
          </button>
          <button
            onClick={dismissNotice}
            className="text-gray-400 hover:text-white ml-2 p-1"
            aria-label="Cerrar aviso"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Top Navigation */}
      <Navbar />

      {/* Dynamic View Content */}
      <main className="flex-1">
        {renderCurrentView()}
      </main>

      {/* Cart & Checkout Slide-Over Drawer */}
      <CartDrawer />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <PizzeriaProvider>
      <AppContent />
    </PizzeriaProvider>
  );
}
