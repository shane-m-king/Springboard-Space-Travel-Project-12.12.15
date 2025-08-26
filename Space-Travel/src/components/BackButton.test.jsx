import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import BackButton from './BackButton';

// Mocks useNavigate for testing
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('BackButton goes back a page', () => {
  test('calls navigate(-1) when clicked', () => {
    render(<BackButton />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});