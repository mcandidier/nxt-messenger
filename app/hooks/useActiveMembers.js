import { create } from "zustand";

const useActiveMembers = (set) => {
  return ({
    members: [],
    add: (id) => set((state) => ({ members: [...state.members, id] })),
    remove: (id) => set((state) => ({ members: state.members.filter((memberId) => memberId !== id) })),
    set: (ids) => set({ members: ids })
   })
}

export default useActiveMembers;