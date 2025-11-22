import { createContext, useContext, type ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNinjas, type Ninja } from '@/api/ninjas';

interface GlobalState {
    ninjas: Ninja[] | undefined;
    isLoading: boolean;
    error: Error | null;
}

const GlobalContext = createContext<GlobalState | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
    const { data: ninjas, isLoading, error } = useQuery({
        queryKey: ['ninjas'],
        queryFn: fetchNinjas,
    });

    return (
        <GlobalContext.Provider value={{ ninjas, isLoading, error }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobal = () => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error('useGlobal must be used within a GlobalProvider');
    }
    return context;
};
