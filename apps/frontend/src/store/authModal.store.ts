import { create } from "zustand";

type Tab = "login" | "register";

interface AuthModalState {
  open: boolean;
  tab: Tab;
  openModal: (tab?: Tab) => void;
  closeModal: () => void;
  setTab: (tab: Tab) => void;
}

export const useAuthModalStore = create<AuthModalState>((set) => ({
  open: false,
  tab: "login",
  openModal: (tab = "login") => set({ open: true, tab }),
  closeModal: () => set({ open: false }),
  setTab: (tab) => set({ tab }),
}));
