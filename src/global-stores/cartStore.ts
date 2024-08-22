import { create } from 'zustand';
import { persist, } from 'zustand/middleware';

type Product = {
    id: number
    name: string;
    price: number;
    quantity: number;
    image: string;
};

type State = {
    products: Product[];
    isOpen: boolean
};

type Actions = {
    setProducts: (products: Product[]) => void;
    setIsOpen: (isOpen: boolean) => void;
};

const INITIAL_STATE: State = {
    products: [],
    isOpen: false
};

export const useCartStore = create<State & Actions>()(
    persist(
        (set) => ({
            ...INITIAL_STATE,
            setProducts: (products) => set({ products }),
            setIsOpen: (isOpen) => set({ isOpen })
        }),
        {
            name: 'cart-store',
        },
    ),
);
