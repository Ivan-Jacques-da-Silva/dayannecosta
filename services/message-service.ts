import type { Message } from "@/types"
import { generateId } from "@/lib/utils"

// Mock messages data
const mockMessages: Message[] = [
  {
    id: "msg1",
    name: "Robert Johnson",
    email: "robert@example.com",
    phone: "(305) 123-4567",
    subject: "Property Inquiry",
    message:
      "I'm interested in the Luxury Waterfront Villa. Could you provide more information about the property and possibly schedule a viewing this weekend?",
    propertyId: "prop1",
    read: true,
    createdAt: "2023-05-20T14:30:00Z",
  },
  {
    id: "msg2",
    name: "Maria Garcia",
    email: "maria@example.com",
    phone: "(305) 987-6543",
    subject: "Modern Brickell Condo",
    message:
      "Hello, I saw your listing for the Modern Brickell Condo and I'm very interested. Is it still available? I'd like to know more about the building amenities and if there are any special assessments.",
    propertyId: "prop2",
    read: false,
    createdAt: "2023-06-25T10:15:00Z",
  },
  {
    id: "msg3",
    name: "David Wilson",
    email: "david@example.com",
    phone: "(786) 555-1234",
    subject: "General Inquiry",
    message:
      "I'm relocating to Miami next month and looking for a 3-bedroom property in the Coral Gables area with a budget of around $1.5M. Do you have any listings that might match my criteria?",
    propertyId: null,
    read: false,
    createdAt: "2023-07-10T16:45:00Z",
  },
  {
    id: "msg4",
    name: "Jennifer Lopez",
    email: "jennifer@example.com",
    phone: "(305) 777-8888",
    subject: "Waterfront Condo in Edgewater",
    message:
      "I'm interested in the Waterfront Condo in Edgewater. Is it possible to arrange a virtual tour? I'm currently out of town but very interested in this property.",
    propertyId: "prop6",
    read: true,
    createdAt: "2023-08-05T11:20:00Z",
  },
  {
    id: "msg5",
    name: "Michael Brown",
    email: "michael@example.com",
    phone: "(786) 333-4444",
    subject: "Contact Form Submission",
    message:
      "I'm looking for investment properties in the Miami area, particularly in up-and-coming neighborhoods. Could you provide some information on potential ROI and rental market trends?",
    propertyId: null,
    read: false,
    createdAt: "2023-09-15T09:30:00Z",
  },
]

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Get all messages
export const getMessages = async (): Promise<Message[]> => {
  await delay(100) // Reduced from 800
  return [...mockMessages]
}

// Get message by ID
export const getMessageById = async (id: string): Promise<Message> => {
  await delay(75) // Reduced from 500
  const message = mockMessages.find((m) => m.id === id)

  if (!message) {
    throw new Error(`Message with ID ${id} not found`)
  }

  return { ...message }
}

// Send a contact message
export const sendContactMessage = async (messageData: Omit<Message, "id" | "read" | "createdAt">): Promise<Message> => {
  await delay(150) // Reduced from 1000

  const newMessage: Message = {
    id: generateId(),
    ...messageData,
    read: false,
    createdAt: new Date().toISOString(),
  }

  mockMessages.unshift(newMessage)
  return newMessage
}

// Mark message as read
export const markMessageAsRead = async (id: string): Promise<Message> => {
  await delay(75) // Reduced from 500

  const index = mockMessages.findIndex((m) => m.id === id)

  if (index === -1) {
    throw new Error(`Message with ID ${id} not found`)
  }

  mockMessages[index].read = true
  return { ...mockMessages[index] }
}

// Delete a message
export const deleteMessage = async (id: string): Promise<void> => {
  await delay(100) // Reduced from 800

  const index = mockMessages.findIndex((m) => m.id === id)

  if (index === -1) {
    throw new Error(`Message with ID ${id} not found`)
  }

  mockMessages.splice(index, 1)
}