import { create } from 'zustand';
import { type GiveawayCardProps } from '../../types';


interface GiveawayState {
  reserved: GiveawayCardProps[];
  claimed: GiveawayCardProps[];

  reserveGiveaway: (giveaway: GiveawayCardProps) => boolean;
  removeReservation: (id: string) => void;
  claimGiveaway: (id: string) => void;
  clearAll: () => void;
}

export const useGiveawayStore = create<GiveawayState>((set, get) => ({
  reserved: [],
  claimed: [],

  reserveGiveaway: (giveaway) => {
    const { reserved } = get();

    if (reserved.find((g) => g.id === giveaway.id)) return false;
    if (reserved.length >= 5) return false;

    set({ reserved: [...reserved, giveaway] });
    return true;
  },

  removeReservation: (id) => {
    set((state) => ({
      reserved: state.reserved.filter((g) => g.id !== id),
    }));
  },

  claimGiveaway: (id) => {
    const { reserved, claimed } = get();
    const toClaim = reserved.find((g) => g.id === id);
    if (!toClaim) return;

    set({
      claimed: [...claimed, toClaim],
      reserved: reserved.filter((g) => g.id !== id),
    });
  },

  clearAll: () => set({ reserved: [] }),
}));
