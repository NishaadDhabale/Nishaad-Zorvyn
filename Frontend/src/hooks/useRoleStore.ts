import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface RoleState {
  role: String;
  setRole: (newRole:String) => void;
}

export const useRoleStore = create<RoleState>()(
  persist(
    (set) => ({
      role: "Admin",
      setRole: (newRole) => set({ role: newRole }),
    }),
    { name: 'role-storage' }
  )
);