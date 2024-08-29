import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type State = {
    products: any[]
};

type Actions = {
    setProducts: (products: State["products"]) => void;
};

const INITIAL_STATE: State = {
    products: [],
};

export const useFavoritesStore = create<State & Actions>()(
    persist(
        (set) => ({
            ...INITIAL_STATE,
            setProducts: (products) => set({ products }),
            reset: () => set(INITIAL_STATE)
        }),
        {
            name: 'favorites-store',
        },
    ),
);
