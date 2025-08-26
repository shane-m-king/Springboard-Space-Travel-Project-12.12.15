import { screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import Form from './Form';
import SpaceTravelApi from '../services/SpaceTravelApi';
import { renderWithProviders } from '../utils/tests/renderWithProviders';


vi.mock('../services/SpaceTravelApi');

// Mocks useNavigate for testing
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

  describe('Form component', () => {
    test('renders all fields and buttons', () => {
        renderWithProviders(<Form />);
  
      expect(screen.getByPlaceholderText(/Name/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/Capacity/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/Description/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/Picture URL/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Craft/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Back/i })).toBeInTheDocument();
    });

    test('shows errors when fields are empty', async () => {
        renderWithProviders(<Form />);
    
        fireEvent.click(screen.getByRole('button', { name: /Craft/i }));
    
        const nameError = await screen.findByText('Name is required (max 40 characters).');
        expect(nameError).toBeInTheDocument();

        const capacityError = await screen.findByText(
          'Capacity must be a number greater than 0 and less than 10,000,000,000.'
        );
        expect(capacityError).toBeInTheDocument();

        const descError = await screen.findByText('Description is required.');
        expect(descError).toBeInTheDocument();
    });

    test('submits form with valid values', async () => {
      SpaceTravelApi.buildSpacecraft.mockResolvedValue({ isError: false });
    
      renderWithProviders(<Form />);
    
      fireEvent.change(screen.getByPlaceholderText(/Name/i), { target: { value: 'Good Spaceship' } });
      fireEvent.change(screen.getByPlaceholderText(/Capacity/i), { target: { value: '10000' } });
      fireEvent.change(screen.getByPlaceholderText(/Description/i), { target: { value: 'A very good spaceship.' } });
        
      fireEvent.click(screen.getByRole('button', { name: /Craft/i }));
    
      await waitFor(() => {
        expect(SpaceTravelApi.buildSpacecraft).toHaveBeenCalledWith({
          name: 'Good Spaceship',
          capacity: 10000,
          description: 'A very good spaceship.',
          // Application should automatically enter this url on empty field
          pictureUrl: 'https://media.istockphoto.com/id/1452870348/vector/rocket-ship-icon-in-flat-style-spacecraft-takeoff-on-space-background-start-up-illustration.jpg?s=612x612&w=0&k=20&c=Ik4wg3D1NmtuebK88Bgb3CKwY7xx5SQ4RcZWKl38ydw='
        });
    
        expect(mockNavigate).toHaveBeenCalledWith('/spacecrafts');  
      });
    });

    test('show errors when fields are not empty, but are invalid', async () => {
        renderWithProviders(<Form />);
      
        fireEvent.change(screen.getByPlaceholderText(/Name/i), { target: { value: 'LONG NAME -> --------------------------------------------------------------------------------------------------------------------------------' } });
        fireEvent.change(screen.getByPlaceholderText(/Capacity/i), { target: { value: 'foo' } });
        fireEvent.change(screen.getByPlaceholderText(/Description/i), { target: { value: 'A very good spaceship.' } });
          
        fireEvent.click(screen.getByRole('button', { name: /Craft/i }));
      
        const nameError = await screen.findByText('Name is required (max 40 characters).');
        expect(nameError).toBeInTheDocument();

        const capacityError = await screen.findByText(
          'Capacity must be a number greater than 0 and less than 10,000,000,000.'
        );
        expect(capacityError).toBeInTheDocument();
      });
  });