export interface Ninja {
    id: string;
    name: string;
    location: 'Konoha' | 'Suna' | 'Kiri' | 'Iwa' | 'Kumo';
    health: 'Healthy' | 'Injured' | 'Critical';
    power: number;
}

export const fetchNinjas = async (): Promise<Ninja[]> => {
    const response = await fetch('http://localhost:3000/ninjas');
    if (!response.ok) {
        throw new Error('Failed to fetch ninjas');
    }
    return response.json();
};
