import React from 'react'
import { FaCartPlus } from 'react-icons/fa'

interface ProductCardProps {
  item: {
    name: string;
    description: string,
    price: number;
  };
  index: number;
  addToCart: (item: { name: string; description: string; price: number }) => void; 
}

const ProductCard: React.FC<ProductCardProps> = ({item, addToCart }) => {
  return (
    <tr className='hover:bg-slate-100'>
        <td>{item.name}</td>
        <td>{item.description}</td>
        <td data-testid="price">$ {item.price}</td>
        <td>
        <button
          data-testid="addToCart"
          onClick={() => addToCart(item)}
          className="bg-blue-500 hover:bg-blue-700 text-white p-2 text-xs rounded text-center"
        >
          <FaCartPlus />
        </button>
        </td>
      </tr>
  )
}

export default ProductCard