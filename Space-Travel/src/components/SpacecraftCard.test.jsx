import { screen } from '@testing-library/react';
import { describe, test, expect, beforeEach, vi } from 'vitest';
import { render } from "@testing-library/react";
import SpacecraftPage from '../pages/SpacecraftPage';
import SpaceTravelApi from '../services/SpaceTravelApi';
import { mockSpacecrafts } from '../tests/__mocks__/spacecraftsMock';
import { mockPlanets } from '../tests/__mocks__/planetsMock';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import AppProviders from '../providers/AppProvider';


vi.mock('../services/SpaceTravelApi');

beforeEach(() => {
  SpaceTravelApi.getSpacecrafts.mockResolvedValue({ data: mockSpacecrafts, isError: false });
  SpaceTravelApi.getPlanets.mockResolvedValue({ data: mockPlanets, isError: false });
});

describe('SpacecraftCard rendering with proper id (useParams)', () => {
    test('renders content based on URL param id', async () => {
        
    for (const ship of mockSpacecrafts) {
      render(
        <MemoryRouter initialEntries={[`/${ship.id}`]}>
          <AppProviders> 
            <Routes>
              <Route path=':spacecraftId' element= {<SpacecraftPage/>}/>
            </Routes>
          </AppProviders>  
        </MemoryRouter>
      );

      const nameEl = await screen.findByText(ship.name);
      expect(nameEl).toBeInTheDocument();
      }
    });

    test('renders correct data, including planet', async () => {
        for (const ship of mockSpacecrafts) {
          render(
            <MemoryRouter initialEntries={[`/${ship.id}`]}>
              <AppProviders> 
                <Routes>
                  <Route path=':spacecraftId' element= {<SpacecraftPage/>}/>
                </Routes>
              </AppProviders>  
            </MemoryRouter>
          );
      
            const nameEl = await screen.findByText(new RegExp(`^Spacecraft Name: ${ship.name}$`));
            expect(nameEl).toBeInTheDocument();

            const capacityEl = await screen.findByText(new RegExp(`^Spacecraft Capacity: ${ship.capacity}$`));
            expect(capacityEl).toBeInTheDocument();

            const planetEl = await screen.findByText(mockPlanets[ship.currentLocation].name)
            expect(planetEl).toBeInTheDocument();

            const descEl = await screen.findByText(ship.description);
            expect(descEl).toBeInTheDocument();
        }
    });

  });