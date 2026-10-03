import React, { createContext, useContext, useState, useEffect } from 'react';
import { PIZZAS, CartItem, ReservationData, Pizza } from '../data/pizzeriaData';

interface PizzeriaContextType {
  currentPage: string;
  currentPizzaSlug: string | null;
  navigateTo: (page: string, pizzaSlug?: string) => void;
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'id' | 'totalPrice'>) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  reservations: ReservationData[];
  addReservation: (res: Omit<ReservationData, 'id' | 'status' | 'createdAt'>) => ReservationData;
  activeOrderNotice: string | null;
  dismissNotice: () => void;
}

const PizzeriaContext = createContext<PizzeriaContextType | undefined>(undefined);

export const PizzeriaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation handling: parse window.location or internal state
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [currentPizzaSlug, setCurrentPizzaSlug] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [activeOrderNotice, setActiveOrderNotice] = useState<string | null>(null);

  // Cart state persisted in localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('antica_fornace_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Reservations state
  const [reservations, setReservations] = useState<ReservationData[]>(() => {
    try {
      const saved = localStorage.getItem('antica_fornace_reservations');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('antica_fornace_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn('Could not save cart to localStorage', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('antica_fornace_reservations', JSON.stringify(reservations));
    } catch (e) {
      console.warn('Could not save reservations', e);
    }
  }, [reservations]);

  // Handle URL hash changes or back/forward buttons
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') || 'home';
      if (hash.startsWith('pizza/')) {
        const slug = hash.replace('pizza/', '');
        const found = PIZZAS.find(p => p.slug === slug);
        if (found) {
          setCurrentPage('pizza-detail');
          setCurrentPizzaSlug(slug);
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
      }
      if (['home', 'menu', 'contacto', 'reservas'].includes(hash)) {
        setCurrentPage(hash);
        setCurrentPizzaSlug(null);
      } else {
        setCurrentPage('home');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: string, pizzaSlug?: string) => {
    if (page === 'pizza-detail' && pizzaSlug) {
      window.location.hash = `pizza/${pizzaSlug}`;
      setCurrentPage('pizza-detail');
      setCurrentPizzaSlug(pizzaSlug);
    } else {
      window.location.hash = page;
      setCurrentPage(page);
      setCurrentPizzaSlug(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (newItem: Omit<CartItem, 'id' | 'totalPrice'>) => {
    const cartItemId = `${newItem.itemId}_${newItem.sizeId || 'std'}_${(newItem.extraIngredients || []).sort().join('_')}_${newItem.doughName || 'std'}`;
    const totalPrice = newItem.unitPrice * newItem.quantity;

    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.id === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        const current = updated[existingIndex];
        const newQty = current.quantity + newItem.quantity;
        updated[existingIndex] = {
          ...current,
          quantity: newQty,
          totalPrice: Number((current.unitPrice * newQty).toFixed(2))
        };
        return updated;
      } else {
        return [
          ...prev,
          {
            ...newItem,
            id: cartItemId,
            totalPrice: Number(totalPrice.toFixed(2))
          }
        ];
      }
    });

    setActiveOrderNotice(`¡Añadido: ${newItem.name}${newItem.sizeName ? ` (${newItem.sizeName})` : ''}!`);
    setTimeout(() => {
      setActiveOrderNotice(null);
    }, 3500);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCart(prev => {
      return prev
        .map(item => {
          if (item.id === cartItemId) {
            const newQty = item.quantity + delta;
            if (newQty <= 0) return null;
            return {
              ...item,
              quantity: newQty,
              totalPrice: Number((item.unitPrice * newQty).toFixed(2))
            };
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null);
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = Number(cart.reduce((sum, item) => sum + item.totalPrice, 0).toFixed(2));
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const addReservation = (res: Omit<ReservationData, 'id' | 'status' | 'createdAt'>): ReservationData => {
    const newReservation: ReservationData = {
      ...res,
      id: `AF-${Math.floor(100000 + Math.random() * 900000)}`,
      status: 'confirmada',
      createdAt: new Date().toISOString()
    };
    setReservations(prev => [newReservation, ...prev]);
    return newReservation;
  };

  const dismissNotice = () => setActiveOrderNotice(null);

  return (
    <PizzeriaContext.Provider
      value={{
        currentPage,
        currentPizzaSlug,
        navigateTo,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        isCartOpen,
        setIsCartOpen,
        reservations,
        addReservation,
        activeOrderNotice,
        dismissNotice
      }}
    >
      {children}
    </PizzeriaContext.Provider>
  );
};

export const usePizzeria = () => {
  const context = useContext(PizzeriaContext);
  if (!context) {
    throw new Error('usePizzeria must be used within a PizzeriaProvider');
  }
  return context;
};
