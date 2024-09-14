'use client'
import { useState, useEffect } from 'react';
import { FaArrowDown, FaArrowUp, FaShoppingCart } from "react-icons/fa";
import Toastify from 'toastify-js';
import ProductCard from './components/ProductCard';
import CartItem from './components/CartItem';
import React from 'react';

interface Item {
  name: string;
  description: string;
  price: number;
}

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [currentMaxPrice, setCurrentMaxPrice] = useState<number>(100); // Added state to track the current range slider value
  const [cart, setCart] = useState<Item[]>([]);
  

  const addToCart = (item: Item) => {
    setCart([...cart, item]);
    Toastify({
      text: "Added to Cart",
      className: "info",
      style: {
        background: "#00b09b",
        color: "#ffffff",
        padding: "10px"
      }
    }).showToast();
  };

  const removeFromCart = (indexToRemove: number) => {
    setCart(cart.filter((_, index) => index !== indexToRemove));
  };

  useEffect(() => {
    fetch('/api/items')
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setFilteredItems(data); 
      });
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    filterItems(term, sortOrder, priceRange);
  };

  const handleSort = (order: 'asc' | 'desc') => {
    setSortOrder(order);
    filterItems(searchTerm, order, priceRange);
  };

  const handlePriceFilter = (min: number, max: number) => {
    setPriceRange([min, max]);
    setCurrentMaxPrice(max); 
    filterItems(searchTerm, sortOrder, [min, max]);
  };

  const filterItems = (searchTerm: string, sortOrder: 'asc' | 'desc' | null, priceRange: [number, number]) => {
    let filtered = items.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm) &&
        item.price >= priceRange[0] &&
        item.price <= priceRange[1]
    );

    if (sortOrder === 'asc') {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'desc') {
      filtered = filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredItems(filtered);
  };

  return (
    <>
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <div className='flex justify-between items-center'>
            <h1 className='text-3xl p-5'>Fruits Items</h1>
            <label htmlFor="my-drawer" className=" drawer-button cursor-pointer text-slate-500 hover:text-slate-700">
              <FaShoppingCart className='text-2xl'/> 
            </label>
          </div>
          <input
            type="text"
            placeholder="Search items"
            value={searchTerm}
            onChange={handleSearch}
            className="rounded-xl border p-2 mb-4 w-full"
          />
          <div className="flex mb-4 justify-between max-w-[800px] sm:flex">
            <div className='flex gap-3 sm:text-base text-xs align'>
              <h3 className='hidden sm:block'>Sort by Price</h3>
              <button data-testid="desc" onClick={() => handleSort('desc')} className='m-0'><FaArrowDown /></button>
              <button onClick={() => handleSort('asc')} className='m-0'><FaArrowUp /></button>
            </div>
            <div className='flex-col'>
              <div className='flex gap-3'>
                0
                <input 
                  type='range' 
                  min='0' 
                  max='100'
                  value={currentMaxPrice} // Bind the value to the current state
                  onChange={(e) => handlePriceFilter(0, Number(e.target.value))}
                />
                100
              </div>
              <div className='text-center'>
                {currentMaxPrice}
              </div>
            </div>
          </div>
        <table className='table table-bordered'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item, index) => (
              <ProductCard key={index} index={index} item={item} addToCart = {addToCart}/>
            ))}
          </tbody>
        </table>
      </div>

      <div className="drawer-side">
        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {!cart.length && <h3 className='px-4 py-4 flex items-center justify-between'>Cart is still empty</h3> }
          {cart.map((item, index) => (
            <CartItem key={index} item={item} index={index} removeFromCart = {removeFromCart}/>
          ))}
        </ul>
      </div>
      </div>
    </>
  );
}
