import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AppProviders from '../../providers/AppProvider';

export const renderWithProviders = (ui) =>
  render(
    <MemoryRouter>
      <AppProviders>{ui}</AppProviders>
    </MemoryRouter>
  );
