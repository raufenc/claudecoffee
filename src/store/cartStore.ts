import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string; // Product id + variant
  productId: string;
  name: string;
  price: number;
  salePrice: number | null;
  vatRate: number; // Added for professional VAT tracking
  image: string;
  variant: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getSummary: () => { subtotal: number; vatTotal: number; total: number; totalItems: number; discount: number; shipping: number };
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => set((state) => {
        const id = `${item.productId}-${item.variant}`;
        const existing = state.items.find(i => i.id === id);
        if (existing) {
          return { items: state.items.map(i => i.id === id ? { ...i, quantity: i.quantity + item.quantity } : i) };
        }
        return { items: [...state.items, { ...item, id }] };
      }),
      removeItem: (id) => set((state) => ({ items: state.items.filter(i => i.id !== id) })),
      updateQuantity: (id, quantity) => set((state) => ({
        items: state.items.map(i => i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i)
      })),
      clearCart: () => set({ items: [] }),
      getSummary: () => {
        const { items } = get();
        const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
        const subtotal = items.reduce((acc, item) => acc + ((item.salePrice || item.price) * item.quantity), 0);
        const vatTotal = items.reduce((acc, item) => {
          const itemPrice = item.salePrice || item.price;
          return acc + (itemPrice * (item.vatRate / 100) * item.quantity);
        }, 0);

        const discount = 0; // Mock current discount logic here if needed
        const shipping = subtotal > 250 || subtotal === 0 ? 0 : 29.90;
        const total = subtotal + vatTotal + shipping - discount;
        
        return { subtotal, vatTotal, total, totalItems, discount, shipping };
      }
    }),
    {
      name: 'claudecoffee-cart',
    }
  )
);
