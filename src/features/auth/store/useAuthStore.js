import { create } from 'zustand'

// Rehydrate from localStorage so a page refresh keeps the user logged in
const storedToken = localStorage.getItem('token')
const storedUser  = JSON.parse(localStorage.getItem('user') || 'null')

export const useAuthStore = create((set) => ({
  token: storedToken,
  user:  storedUser,

  setAuth: (token, user) => {
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
    set({ token, user })
  },

  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    set({ token: null, user: null })
  },
}))
