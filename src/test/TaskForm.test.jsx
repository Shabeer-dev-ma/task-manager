import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import TaskForm from '../components/TaskForm'

describe('TaskForm', () => {
  it('renders the Add Task button', () => {
    render(<TaskForm onAddTask={vi.fn()} />)
    expect(screen.getByRole('button', { name: /add task/i })).toBeInTheDocument()
  })

  it('does not submit when title is empty', async () => {
    const onAddTask = vi.fn()
    render(<TaskForm onAddTask={onAddTask} />)
    await userEvent.click(screen.getByRole('button', { name: /add task/i }))
    expect(onAddTask).not.toHaveBeenCalled()
  })

  it('calls onAddTask with correct data when submitted', async () => {
    const onAddTask = vi.fn()
    render(<TaskForm onAddTask={onAddTask} />)

    await userEvent.type(screen.getByPlaceholderText(/task title/i), 'Test task')
    await userEvent.type(screen.getByPlaceholderText(/description/i), 'Test desc')
    await userEvent.click(screen.getByRole('button', { name: /add task/i }))

    expect(onAddTask).toHaveBeenCalledWith(
      expect.objectContaining({ title: 'Test task', description: 'Test desc' })
    )
  })

  it('clears the form after submission', async () => {
    render(<TaskForm onAddTask={vi.fn()} />)
    const titleInput = screen.getByPlaceholderText(/task title/i)

    await userEvent.type(titleInput, 'My task')
    await userEvent.click(screen.getByRole('button', { name: /add task/i }))

    expect(titleInput).toHaveValue('')
  })
})
