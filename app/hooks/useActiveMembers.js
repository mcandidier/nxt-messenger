import { create } from "zustand";

const useActiveMembers = create((set) => ({
  members: [],
  add: (id) => set((state) => ({ members: [...state.members, id] })),
  remove: (id) => set((state) => ({ members: state.members.filter((memberId) =>{
    return memberId !== id;
  }) })),
  set: (ids) => set({ members: ids })
})
)

export default useActiveMembers;