import { create } from 'zustand';

type State = {
    priceLimit: number
    priceMinimum: number
}

type Actions = {
    setPriceLimit: (limit: number) => void
    setPriceMinimum: (min: number) => void
}


const INITIAL_STATE: State = {
    priceLimit: 2000,
    priceMinimum: 0
};


export const useStore = create<State & Actions>((set) => ({
    ...INITIAL_STATE,
    setPriceLimit: (priceLimit) => set(() => ({ priceLimit })),
    setPriceMinimum: (priceMinimum) => set(() => ({ priceMinimum })),
}));

