import { create } from 'zustand';

export type TabType = 'Overview' | 'Insights' | 'Transactions';

interface NavigationState {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export const useNavigationStore = create<NavigationState>((set) => ({
  activeTab: 'Overview',
  setActiveTab: (tab) => set({ activeTab: tab }),
}));