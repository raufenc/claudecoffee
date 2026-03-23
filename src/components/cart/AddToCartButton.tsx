'use client';

import { useCartStore } from '@/store/cartStore';

interface AddToCartProps {
  product: {
    id: string;
    name: string;
    price: number;
    salePrice: number | null;
  };
}

export default function AddToCartButton({ product }: AddToCartProps) {
  const { addItem } = useCartStore();

  const handleAdd = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      salePrice: product.salePrice,
      vatRate: 20,
      image: '',
      variant: 'Standart',
      quantity: 1
    });
    alert('Sepete eklendi!');
  };

  return (
    <button onClick={handleAdd} className="btn btn-primary btn-lg" id="detail-add-to-cart" style={{ flex: 1 }}>
      Sepete Ekle
    </button>
  );
}
