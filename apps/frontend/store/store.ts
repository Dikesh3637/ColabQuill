import { create } from "zustand";

interface BoundStore {
	// formStoreState
	formType: "signup" | "signin";
	setFormType: (formType: "signup" | "signin") => void;
}

export const useAppStore = create<BoundStore>()((set) => ({
	formType: "signup",
	setFormType: (formType) => set((state) => ({ ...state, formType })),
}));
