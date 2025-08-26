import { screen } from '@testing-library/react';
import { describe, test, expect, beforeEach, vi } from 'vitest';
import Planets from './Planets';
import { renderWithProviders } from '../utils/tests/renderWithProviders';
import SpaceTravelApi from '../services/SpaceTravelApi';
import { mockSpacecrafts } from '../tests/__mocks__/spacecraftsMock';
import { mockPlanets } from '../tests/__mocks__/planetsMock';


vi.mock('../services/SpaceTravelApi');

beforeEach(() => {
  SpaceTravelApi.getSpacecrafts.mockResolvedValue({ data: mockSpacecrafts, isError: false });
  SpaceTravelApi.getPlanets.mockResolvedValue({ data: mockPlanets, isError: false });
});

describe('Planets component + rendering individual planets', () => {
  test('shows loading state initially', () => {
    renderWithProviders(<Planets />);
    expect(screen.getByText(/LOADING PLANETS/i)).toBeInTheDocument();
  });

  test('renders planet list after loading', async () => {
    renderWithProviders(<Planets />);

    for (const planet of mockPlanets) {
      const nameEl = await screen.findByText(planet.name);
      expect(nameEl).toBeInTheDocument();
    }

    // RegExp allows us to search for the population, even though more is rendered in its tag
    // Earth is only planet populated in mock data, so we can get just the one  
    const popEl = screen.getByText(new RegExp(`^Population: ${mockPlanets[2].currentPopulation}$`));
    expect(popEl).toBeInTheDocument();
  });

  test('renders "No planets found" if list is empty', async () => {
    SpaceTravelApi.getPlanets.mockResolvedValue({ data: [], isError: false });

    renderWithProviders(<Planets />);

    const message = await screen.findByText(/No planets found/i);
    expect(message).toBeInTheDocument();
  });
});