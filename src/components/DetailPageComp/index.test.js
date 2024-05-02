import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

import DetailPageComp from '.';

describe('DetailPageComp', () => {
  beforeEach(() => {
    jest.spyOn(window.localStorage.__proto__, 'getItem').mockReturnValue(null);
  });

  it('displays item details when item is found in local storage', async () => {
    const item = {
      id: '123',
      name: 'Test University',
      country: 'Test Country',
      web_pages: ['https://example.com/test'],
    };
    jest.spyOn(window.localStorage.__proto__, 'getItem').mockReturnValue(JSON.stringify({ '123': item }));
  
    render(
      <MemoryRouter initialEntries={['/123']}>
        <Routes>
          <Route path="/:id" element={<DetailPageComp />} /> {/* Wrap Route in Routes */}
        </Routes>
      </MemoryRouter>
    );
  
    await waitFor(() => {
      expect(screen.getByText('Name: Test University')).toBeInTheDocument();
    });
  
    await waitFor(() => {
      expect(screen.getByText('Country: Test Country')).toBeInTheDocument();
    });
  
    await waitFor(() => {
      expect(screen.getByText('Website: https://example.com/test')).toBeInTheDocument();
    });
  });

});
