import { screen } from '@testing-library/react';
import { describe, test, expect, beforeEach, vi } from 'vitest';
import Spacecrafts from './Spacecrafts';
import { renderWithProviders } from '../utils/tests/renderWithProviders';
import SpaceTravelApi from '../services/SpaceTravelApi';
import { mockSpacecrafts } from '../tests/__mocks__/spacecraftsMock';
import { mockPlanets } from '../tests/__mocks__/planetsMock';


vi.mock('../services/SpaceTravelApi');

beforeEach(() => {
  SpaceTravelApi.getSpacecrafts.mockResolvedValue({ data: mockSpacecrafts, isError: false });
  SpaceTravelApi.getPlanets.mockResolvedValue({ data: mockPlanets, isError: false });
});

describe('Spacecrafts component + rendering individual spacecraft', () => {
  test('shows loading state initially', () => {
    renderWithProviders(<Spacecrafts />);
    expect(screen.getByText(/LOADING SPACECRAFT/i)).toBeInTheDocument();
  });

  test('renders spacecraft list after loading', async () => {
    renderWithProviders(<Spacecrafts />);

    for (const ship of mockSpacecrafts) {
      const nameEl = await screen.findByText(ship.name);
      expect(nameEl).toBeInTheDocument();

    // RegExp allows us to search for the capaicty, even though more is rendered in its tag  
      const capacityEl = screen.getByText(new RegExp(`^Capacity: ${ship.capacity}$`));
      expect(capacityEl).toBeInTheDocument();
    }
  });

  test('renders "No spacecrafts found" if list is empty', async () => {
    SpaceTravelApi.getSpacecrafts.mockResolvedValue({ data: [], isError: false });

    renderWithProviders(<Spacecrafts />);

    const message = await screen.findByText(/No spacecrafts found/i);
    expect(message).toBeInTheDocument();
  });
});