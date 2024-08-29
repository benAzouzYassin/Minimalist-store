import { create } from 'zustand';
import { persist, } from 'zustand/middleware';

type CouponType = {
    createdAt: string;
    endDate: string;
    id: number;
    name: string;
    percentage: string;
    startDate: string;
    updatedAt: string;
    usageLeft: number;
};

type Product = {
    id: number
    name: string;
    price: number;
    quantity: number;
    image: string;
    promotion?: {
        isDiscounted: boolean;
        discountPercentage: string;
        discountedPrice: number;
    };
};

type State = {
    products: Product[];
    isOpen: boolean
    coupon: CouponType | null
};

type Actions = {
    setProducts: (products: Product[]) => void;
    setIsOpen: (isOpen: boolean) => void;
    setCoupon: (coupon: CouponType | null) => void
    reset: () => void
};

const INITIAL_STATE: State = {
    products: [],
    isOpen: false,
    coupon: null
};

export const useCartStore = create<State & Actions>()(
    persist(
        (set) => ({
            ...INITIAL_STATE,
            setProducts: (products) => set({ products }),
            setIsOpen: (isOpen) => set({ isOpen }),
            setCoupon: (coupon) => set({ coupon }),
            reset: () => set(INITIAL_STATE)
        }),
        {
            name: 'cart-store',
        },
    ),
);
