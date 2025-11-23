import { render, screen, fireEvent } from '@testing-library/react';
import { DataTable } from './data-table';
import { columns } from './columns';
import type { Ninja } from '@/api/ninjas';

const mockData: Ninja[] = [
    { id: '1', name: 'Naruto Uzumaki', location: 'Konoha', health: 'Healthy', power: 9000 },
    { id: '2', name: 'Sasuke Uchiha', location: 'Konoha', health: 'Injured', power: 8500 },
    { id: '3', name: 'Gaara', location: 'Suna', health: 'Healthy', power: 8000 },
];

describe('Ninja Table', () => {
    it('renders the table with data', () => {
        render(<DataTable columns={columns} data={mockData} />);

        expect(screen.getByText('Naruto Uzumaki')).toBeInTheDocument();
        expect(screen.getByText('Sasuke Uchiha')).toBeInTheDocument();
        expect(screen.getByText('Gaara')).toBeInTheDocument();
    });

    it('filters data when typing in the search input', () => {
        render(<DataTable columns={columns} data={mockData} />);

        const searchInput = screen.getByPlaceholderText('Search...');

        // Search for "Naruto"
        fireEvent.change(searchInput, { target: { value: 'Naruto' } });

        expect(screen.getByText('Naruto Uzumaki')).toBeInTheDocument();
        expect(screen.queryByText('Sasuke Uchiha')).not.toBeInTheDocument();
        expect(screen.queryByText('Gaara')).not.toBeInTheDocument();

        // Search for "Suna" (Location)
        fireEvent.change(searchInput, { target: { value: 'Suna' } });

        expect(screen.queryByText('Naruto Uzumaki')).not.toBeInTheDocument();
        expect(screen.getByText('Gaara')).toBeInTheDocument();
    });

    it('shows no results when search matches nothing', () => {
        render(<DataTable columns={columns} data={mockData} />);

        const searchInput = screen.getByPlaceholderText('Search...');
        fireEvent.change(searchInput, { target: { value: 'Sakura' } });

        expect(screen.getByText('No results.')).toBeInTheDocument();
    });
});
