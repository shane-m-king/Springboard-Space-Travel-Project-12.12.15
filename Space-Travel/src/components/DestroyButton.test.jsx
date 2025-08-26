import { screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, test, expect, beforeEach, vi } from 'vitest';
import Spacecrafts from './Spacecrafts';
import { renderWithProviders } from '../utils/tests/renderWithProviders';
import SpaceTravelApi from '../services/SpaceTravelApi';
import * as loadData from '../utils/loadData'
import { mockPlanets } from '../tests/__mocks__/planetsMock';

vi.mock('../services/SpaceTravelApi');

vi.spyOn(loadData, 'loadSpacecrafts').mockImplementation((setSpacecrafts, setLoading) => {
    setSpacecrafts([
      { id: 'ship1', name: 'Prispax', capacity: 10000, pictureUrl: 'prispax.jpg', currentLocation: 2 }
    ]);
    setLoading(false);
  });
  
  vi.spyOn(loadData, 'loadPlanets').mockImplementation((setPlanets) => {
    setPlanets(mockPlanets);
  });

beforeEach(() => {
  SpaceTravelApi.getSpacecrafts.mockResolvedValue({
    isError: false,
    data: [
      {
        id: "ship1",
        name: "Prispax",
        capacity: 10000,
        pictureUrl: "prispax.jpg",
        currentLocation: 2,
      }
    ]
  });
  SpaceTravelApi.getPlanets.mockResolvedValue({ data: mockPlanets, isError: false });
  SpaceTravelApi.destroySpacecraftById = vi.fn().mockResolvedValue({ success: true });
  });

describe('destroy button successfully destroys spacecraft', () => {
    test('destroyed ship disappears after clicking destroy', async () => {
        renderWithProviders(<Spacecrafts />);
    
        const ship = await screen.findByText(/Prispax/i);
        expect(ship).toBeInTheDocument();
    
        const destroyButton = screen.getByText(/DESTROY 💥/i);
        fireEvent.click(destroyButton);
    
        await waitFor(() => {
          expect(screen.queryByText(/Prispax/i)).not.toBeInTheDocument();
        });
    
        expect(SpaceTravelApi.destroySpacecraftById).toHaveBeenCalledWith({ id: "ship1" });
      });
    });