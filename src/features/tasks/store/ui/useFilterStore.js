import { create } from 'zustand'

// Zustand store for task filter UI state.
// No Provider needed — any component can import and use this directly.
const useFilterStore = create((set) => ({
  // State
  search: '',
  filterPriority: 'All',

  // Actions — co-located with state (unlike Redux slices)
  setSearch: (search) => set({ search }),
  setFilterPriority: (filterPriority) => set({ filterPriority }),
  resetFilters: () => set({ search: '', filterPriority: 'All' }),
}))

export default useFilterStore
