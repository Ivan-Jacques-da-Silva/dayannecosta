// Property types
export interface Property {
  id: string
  title: string
  description: string
  price: number
  type: string
  status: string
  bedrooms: number
  bathrooms: number
  garage: number
  size: number
  yearBuilt: number
  address: string
  location: {
    latitude: number
    longitude: number
  }
  features: string[]
  images: string[]
  agent: Agent
  createdAt: string
}

// Agent types
export interface Agent {
  id: string
  name: string
  phone: string
  email: string
  photo?: string
}

// User types
export interface User {
  id: string
  name: string
  email: string
  password?: string
  role: string
  createdAt: string
}

// Message types
export interface Message {
  id: string
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  propertyId?: string | null
  read: boolean
  createdAt: string
}
