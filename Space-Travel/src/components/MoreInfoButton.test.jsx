import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import MoreInfoButton from './MoreInfoButton';

// Mocks useNavigate for testing
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('BuildButton takes you to build page', () => {
  test('calls navigate("/:SpacecraftId") when clicked', () => {
      render(<MoreInfoButton num='foo'/>);
    
      const button = screen.getByRole('button');
      fireEvent.click(button);
    
      expect(mockNavigate).toHaveBeenCalledWith('/foo');
  });
});