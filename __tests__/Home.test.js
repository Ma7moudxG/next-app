import { render, screen,fireEvent, waitFor  } from '@testing-library/react';
import Home from '../app/page';
import React from 'react';

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve([
        { id: 1, name: 'apple', price: 10 }, 
        { id: 2, name: 'banana', price: 5 }
      ]),
    })
  );
});

test('filters items by search term', async () => {
  render(<Home />);
  
  const searchInput = screen.getByPlaceholderText('Search items');
  fireEvent.change(searchInput, { target: { value: 'apple' } });
  
  const filteredItem = await screen.findByText((content, element) => {
    return content.includes('apple');
  });
  expect(filteredItem).toBeInTheDocument();
});


test('sorts items by ascending price', async () => {
  render(<Home />);

  const sortButton = await screen.findByTestId('desc');
  fireEvent.click(sortButton);

  await waitFor(() => {
    const prices = screen.getAllByTestId('price');
    console.log("Prices after sorting: ", prices.map(price => price.textContent));
    
    expect(prices.length).toBeGreaterThan(0);  

    const firstItemPrice = parseFloat(prices[0].textContent.trim().replace(/[^\d.-]/g, ''));
    const secondItemPrice = parseFloat(prices[1].textContent.trim().replace(/[^\d.-]/g, ''));
  
    expect(firstItemPrice).toBeLessThanOrEqual(secondItemPrice);
  });
});

test('sorts items by descending price', async () => {
  render(<Home />);

  const sortButton = await screen.findByTestId('desc');
  fireEvent.click(sortButton);

  await waitFor(() => {
    const prices = screen.getAllByTestId('price');
    console.log("Prices after sorting: ", prices.map(price => price.textContent));
    
    expect(prices.length).toBeGreaterThan(0);  
    
    const firstItemPrice = parseFloat(prices[0].textContent.trim().replace(/[^\d.-]/g, ''));
    const secondItemPrice = parseFloat(prices[1].textContent.trim().replace(/[^\d.-]/g, ''));
  
    expect(firstItemPrice).toBeGreaterThan(secondItemPrice);
  });
});


test('adds item to cart', async () => {
  render(<Home />);
  
  const addButton =  await screen.findAllByTestId("addToCart");
  fireEvent.click(addButton[0]);
  
  const cartItem = await screen.findByTestId("item-name");
  expect(cartItem).toBeInTheDocument();
});