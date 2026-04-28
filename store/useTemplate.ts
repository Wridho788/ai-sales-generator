import { create } from "zustand";

export const useTemplate = create<{ template: string; setTemplate: (t: string) => void }>((set) => ({
  template: "default",
  setTemplate: (t) => set({ template: t }),
}));
