export interface Ninja {
    id: string;
    name: string;
    location: 'Konoha' | 'Suna' | 'Kiri' | 'Iwa' | 'Kumo';
    health: 'Healthy' | 'Injured' | 'Critical';
    power: number;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export const fetchNinjas = async (): Promise<Ninja[]> => {
    const response = await fetch(`${API_BASE_URL}/ninjas`);
    if (!response.ok) {
        throw new Error('Failed to fetch ninjas');
    }
    return response.json();
};
