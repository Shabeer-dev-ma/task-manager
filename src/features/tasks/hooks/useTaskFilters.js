import useFilterStore from '../store/ui/useFilterStore'

// Reads filter state from Zustand — persists across page navigations
// Previously used useState, which reset on every unmount
function useTaskFilters(tasks) {
  const { search, filterPriority, setSearch, setFilterPriority } = useFilterStore()

  const filtered = tasks
    .filter(t => !t.archived)
    .filter(t => filterPriority === 'All' || t.priority === filterPriority)
    .filter(t => t.title.toLowerCase().includes(search.toLowerCase()))

  return { filtered, search, setSearch, filterPriority, setFilterPriority }
}

export default useTaskFilters
