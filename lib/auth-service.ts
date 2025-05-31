// This is a mock implementation for demonstration purposes
// In a real app, you would connect to your actual backend services

export interface User {
  id: string
  username: string
  email: string
  isVerified: boolean
  isModel: boolean
  hasPaymentMethod: boolean
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials {
  username: string
  email: string
  password: string
}

// Mock user storage
const USERS_STORAGE_KEY = "fansbe_users"

// Get users from localStorage if available (client-side only)
const getUsers = (): User[] => {
  if (typeof window === "undefined") return []

  const storedUsers = localStorage.getItem(USERS_STORAGE_KEY)
  return storedUsers ? JSON.parse(storedUsers) : []
}

// Save users to localStorage (client-side only)
const saveUsers = (users: User[]): void => {
  if (typeof window === "undefined") return

  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users))
}

export const authService = {
  // Register a new user
  register: async (credentials: RegisterCredentials): Promise<User> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const users = getUsers()

    // Check if email already exists
    if (users.some((user) => user.email === credentials.email)) {
      throw new Error("Email already in use")
    }

    // Check if username already exists
    if (users.some((user) => user.username === credentials.username)) {
      throw new Error("Username already taken")
    }

    const newUser: User = {
      id: Date.now().toString(),
      username: credentials.username,
      email: credentials.email,
      isVerified: false,
      isModel: false,
      hasPaymentMethod: false,
    }

    users.push(newUser)
    saveUsers(users)

    // Save current user to session
    if (typeof window !== "undefined") {
      sessionStorage.setItem("currentUser", JSON.stringify(newUser))
    }

    return newUser
  },

  // Login a user
  login: async (credentials: LoginCredentials): Promise<User> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const users = getUsers()

    // In a real app, you'd verify the password hash
    // Here we're just checking if the email exists
    const user = users.find((user) => user.email === credentials.email)

    if (!user) {
      throw new Error("Invalid credentials")
    }

    // Save current user to session
    if (typeof window !== "undefined") {
      sessionStorage.setItem("currentUser", JSON.stringify(user))
    }

    return user
  },

  // Logout the current user
  logout: async (): Promise<void> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Remove user from session
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("currentUser")
    }
  },

  // Get the current logged in user
  getCurrentUser: (): User | null => {
    if (typeof window === "undefined") return null

    const userJson = sessionStorage.getItem("currentUser")
    return userJson ? JSON.parse(userJson) : null
  },

  // Add a payment method
  addPaymentMethod: async (userId: string, cardData: any): Promise<boolean> => {
    // Simulate API call to Segpay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const users = getUsers()
    const userIndex = users.findIndex((user) => user.id === userId)

    if (userIndex === -1) {
      throw new Error("User not found")
    }

    // Update user with payment method
    users[userIndex].hasPaymentMethod = true
    saveUsers(users)

    // Update current user in session
    if (typeof window !== "undefined") {
      const currentUser = JSON.parse(sessionStorage.getItem("currentUser") || "{}")
      if (currentUser.id === userId) {
        currentUser.hasPaymentMethod = true
        sessionStorage.setItem("currentUser", JSON.stringify(currentUser))
      }
    }

    return true
  },
}
