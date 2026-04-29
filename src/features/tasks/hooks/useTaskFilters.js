import { useState } from 'react'

// Encapsulates filter + search logic — keeps the page component clean
function useTaskFilters(tasks) {
  const [search, setSearch] = useState('')
  const [filterPriority, setFilterPriority] = useState('All')

  const filtered = tasks
    .filter(t => !t.archived)
    .filter(t => filterPriority === 'All' || t.priority === filterPriority)
    .filter(t => t.title.toLowerCase().includes(search.toLowerCase()))

  return { filtered, search, setSearch, filterPriority, setFilterPriority }
}

export default useTaskFilters
