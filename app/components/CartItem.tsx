import React from 'react';
import { FaTrash } from 'react-icons/fa';

interface CartItemProps {
  item: {
    name: string;
    description: string,
    price: number;
  };
  index: number;
  removeFromCart: (index: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, index, removeFromCart }) => {
  return (
    <div className='px-4 py-4 flex items-center justify-between'>
      <p data-testid="item-name">{item.name} - ${item.price}</p>
      <button
        onClick={() => removeFromCart(index)}
        className="bg-red-500 hover:bg-red-700 text-white p-2 text-xs rounded text-center"
      >
        <FaTrash />
      </button>  
    </div>
  );
};

export default CartItem;
