import type { Property } from "@/types"
import { generateId } from "@/lib/utils"

// Mock data for properties
const mockProperties: Property[] = [
  {
    id: "prop1",
    title: "Luxury Waterfront Villa",
    description:
      "This stunning waterfront villa offers breathtaking views of Biscayne Bay. With 5 bedrooms, 6 bathrooms, and a private dock, this property is perfect for luxury living and entertaining.\n\nThe open floor plan features high ceilings, floor-to-ceiling windows, and premium finishes throughout. The gourmet kitchen includes top-of-the-line appliances, custom cabinetry, and a large center island.\n\nOutdoor amenities include an infinity pool, summer kitchen, and lush landscaping for ultimate privacy.",
    price: 4500000,
    type: "villa",
    status: "For Sale",
    bedrooms: 5,
    bathrooms: 6,
    garage: 3,
    size: 6200,
    yearBuilt: 2018,
    address: "123 Palm Island Dr, Miami Beach, FL 33139",
    location: {
      latitude: 25.7775,
      longitude: -80.1412,
    },
    features: [
      "Waterfront",
      "Private Dock",
      "Infinity Pool",
      "Smart Home System",
      "Wine Cellar",
      "Home Theater",
      "Gourmet Kitchen",
      "Marble Floors",
      "Walk-in Closets",
      "Hurricane Impact Windows",
    ],
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    agent: {
      id: "agent1",
      name: "Sarah Johnson",
      phone: "(305) 555-1234",
      email: "sarah@miamiluxuryestates.com",
      photo: "/placeholder.svg?height=200&width=200",
    },
    createdAt: "2023-05-15T10:30:00Z",
  },
  {
    id: "prop2",
    title: "Modern Brickell Condo",
    description:
      "Luxurious condo in the heart of Brickell with stunning views of the Miami skyline and Biscayne Bay. This 3-bedroom, 3.5-bathroom residence features an open floor plan with high-end finishes.\n\nThe gourmet kitchen is equipped with Italian cabinetry, quartz countertops, and premium appliances. The primary suite offers a spa-like bathroom and a large walk-in closet.\n\nBuilding amenities include a state-of-the-art fitness center, infinity pool, spa, valet parking, and 24-hour concierge service.",
    price: 1850000,
    type: "condo",
    status: "For Sale",
    bedrooms: 3,
    bathrooms: 3.5,
    garage: 2,
    size: 2100,
    yearBuilt: 2019,
    address: "485 Brickell Ave, Miami, FL 33131",
    location: {
      latitude: 25.7689,
      longitude: -80.1896,
    },
    features: [
      "Bay Views",
      "Floor-to-Ceiling Windows",
      "Private Balcony",
      "Italian Kitchen",
      "Quartz Countertops",
      "Walk-in Closet",
      "Smart Home Features",
      "Porcelain Floors",
      "Wine Refrigerator",
      "Electric Blinds",
    ],
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    agent: {
      id: "agent2",
      name: "Sarah Johnson",
      phone: "(305) 555-1234",
      email: "sarah@miamiluxuryestates.com",
      photo: "/placeholder.svg?height=200&width=200",
    },
    createdAt: "2023-06-20T14:45:00Z",
  },
  {
    id: "prop3",
    title: "Coral Gables Mediterranean Estate",
    description:
      "Elegant Mediterranean estate in the prestigious Coral Gables neighborhood. This 6-bedroom, 7-bathroom home sits on a lush 1-acre lot with mature landscaping and a resort-style pool.\n\nThe interior features soaring ceilings, marble floors, and custom millwork throughout. The chef's kitchen opens to a family room with French doors leading to the covered loggia.\n\nAdditional amenities include a home office, media room, wine cellar, and guest house. Located near top schools, shopping, and dining.",
    price: 5900000,
    type: "house",
    status: "For Sale",
    bedrooms: 6,
    bathrooms: 7,
    garage: 3,
    size: 7500,
    yearBuilt: 2010,
    address: "789 Coral Way, Coral Gables, FL 33134",
    location: {
      latitude: 25.7465,
      longitude: -80.264,
    },
    features: [
      "Mediterranean Architecture",
      "Resort-Style Pool",
      "Guest House",
      "Wine Cellar",
      "Media Room",
      "Home Office",
      "Marble Floors",
      "Custom Millwork",
      "Summer Kitchen",
      "Covered Loggia",
    ],
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    agent: {
      id: "agent1",
      name: "Sarah Johnson",
      phone: "(305) 555-1234",
      email: "sarah@miamiluxuryestates.com",
      photo: "/placeholder.svg?height=200&width=200",
    },
    createdAt: "2023-07-05T09:15:00Z",
  },
  {
    id: "prop4",
    title: "Luxury Penthouse with Ocean Views",
    description:
      "Spectacular penthouse with panoramic ocean views in an exclusive Miami Beach building. This 4-bedroom, 4.5-bathroom residence offers over 3,500 square feet of luxury living space.\n\nFeatures include a private rooftop terrace with a plunge pool, summer kitchen, and 360-degree views. The interior boasts 12-foot ceilings, floor-to-ceiling windows, and a gourmet kitchen with top-of-the-line appliances.\n\nBuilding amenities include a private beach club, infinity pool, spa, fitness center, and 24-hour concierge service.",
    price: 7200000,
    type: "penthouse",
    status: "For Sale",
    bedrooms: 4,
    bathrooms: 4.5,
    garage: 2,
    size: 3500,
    yearBuilt: 2020,
    address: "5775 Collins Ave, Miami Beach, FL 33140",
    location: {
      latitude: 25.8292,
      longitude: -80.1222,
    },
    features: [
      "Ocean Views",
      "Private Rooftop Terrace",
      "Plunge Pool",
      "Summer Kitchen",
      "Floor-to-Ceiling Windows",
      "Smart Home Technology",
      "Private Elevator",
      "Wine Room",
      "Designer Finishes",
      "Private Beach Club Access",
    ],
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    agent: {
      id: "agent2",
      name: "Sarah Johnson",
      phone: "(305) 555-1234",
      email: "sarah@miamiluxuryestates.com",
      photo: "/placeholder.svg?height=200&width=200",
    },
    createdAt: "2023-08-10T11:20:00Z",
  },
  {
    id: "prop5",
    title: "Downtown Luxury Apartment",
    description:
      "Stylish apartment in the heart of Downtown Miami with stunning city views. This 2-bedroom, 2-bathroom unit features modern design and high-end finishes.\n\nThe open-concept living area includes a gourmet kitchen with stainless steel appliances and quartz countertops. Floor-to-ceiling windows provide abundant natural light and showcase the city skyline.\n\nBuilding amenities include a rooftop pool, fitness center, resident lounge, and 24-hour security. Walking distance to restaurants, shops, and entertainment.",
    price: 3500,
    type: "apartment",
    status: "For Rent",
    bedrooms: 2,
    bathrooms: 2,
    garage: 1,
    size: 1200,
    yearBuilt: 2018,
    address: "350 S Miami Ave, Miami, FL 33130",
    location: {
      latitude: 25.7617,
      longitude: -80.1918,
    },
    features: [
      "City Views",
      "Floor-to-Ceiling Windows",
      "Stainless Steel Appliances",
      "Quartz Countertops",
      "Hardwood Floors",
      "Walk-in Closets",
      "Balcony",
      "In-Unit Washer/Dryer",
      "Smart Home Features",
      "Pet-Friendly",
    ],
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    agent: {
      id: "agent3",
      name: "Sarah Johnson",
      phone: "(305) 555-1234",
      email: "sarah@miamiluxuryestates.com",
      photo: "/placeholder.svg?height=200&width=200",
    },
    createdAt: "2023-09-01T15:30:00Z",
  },
  {
    id: "prop6",
    title: "Waterfront Condo in Edgewater",
    description:
      "Beautiful waterfront condo in the trendy Edgewater neighborhood with direct bay views. This 3-bedroom, 2-bathroom unit offers a spacious open floor plan and a large balcony.\n\nThe modern kitchen features custom cabinetry, quartz countertops, and high-end appliances. The primary suite includes a luxurious bathroom and walk-in closet.\n\nBuilding amenities include a bayfront pool, fitness center, spa, tennis courts, and 24-hour security. Close to Wynwood, Design District, and Midtown.",
    price: 1200000,
    type: "condo",
    status: "For Sale",
    bedrooms: 3,
    bathrooms: 2,
    garage: 1,
    size: 1800,
    yearBuilt: 2016,
    address: "460 NE 28th St, Miami, FL 33137",
    location: {
      latitude: 25.8029,
      longitude: -80.1874,
    },
    features: [
      "Waterfront",
      "Bay Views",
      "Large Balcony",
      "Open Floor Plan",
      "Custom Kitchen",
      "Quartz Countertops",
      "Walk-in Closet",
      "Floor-to-Ceiling Windows",
      "Porcelain Tile Floors",
      "Impact Windows",
    ],
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    agent: {
      id: "agent3",
      name: "Sarah Johnson",
      phone: "(305) 555-1234",
      email: "sarah@miamiluxuryestates.com",
      photo: "/placeholder.svg?height=200&width=200",
    },
    createdAt: "2023-10-15T13:45:00Z",
  },
  {
    id: "prop7",
    title: "Coconut Grove Townhouse",
    description:
      "Charming townhouse in the heart of Coconut Grove, offering a perfect blend of comfort and style. This 3-bedroom, 2.5-bathroom residence features a spacious living area and a private patio.\n\nThe updated kitchen includes granite countertops, stainless steel appliances, and ample cabinet space. The primary bedroom offers a walk-in closet and an en-suite bathroom.\n\nLocated in a gated community with a pool and clubhouse. Walking distance to shops, restaurants, parks, and marinas.",
    price: 850000,
    type: "townhouse",
    status: "For Sale",
    bedrooms: 3,
    bathrooms: 2.5,
    garage: 1,
    size: 1950,
    yearBuilt: 2005,
    address: "3250 Grand Ave, Coconut Grove, FL 33133",
    location: {
      latitude: 25.7273,
      longitude: -80.2421,
    },
    features: [
      "Gated Community",
      "Private Patio",
      "Updated Kitchen",
      "Granite Countertops",
      "Stainless Steel Appliances",
      "Walk-in Closet",
      "Community Pool",
      "Clubhouse",
      "Hardwood Floors",
      "Hurricane Impact Windows",
    ],
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    agent: {
      id: "agent4",
      name: "Sarah Johnson",
      phone: "(305) 555-1234",
      email: "sarah@miamiluxuryestates.com",
      photo: "/placeholder.svg?height=200&width=200",
    },
    createdAt: "2023-11-20T10:00:00Z",
  },
  {
    id: "prop8",
    title: "Luxury Apartment in South Beach",
    description:
      "Stylish apartment in the vibrant South Beach neighborhood, just steps from the ocean. This 1-bedroom, 1-bathroom unit features modern design and high-quality finishes.\n\nThe open-concept living space includes a fully equipped kitchen with stainless steel appliances and quartz countertops. Large windows provide abundant natural light and partial ocean views.\n\nBuilding amenities include a rooftop pool, fitness center, and 24-hour security. Walking distance to Lincoln Road, Ocean Drive, and world-class dining and entertainment.",
    price: 2800,
    type: "apartment",
    status: "For Rent",
    bedrooms: 1,
    bathrooms: 1,
    garage: 1,
    size: 850,
    yearBuilt: 2015,
    address: "1500 Ocean Dr, Miami Beach, FL 33139",
    location: {
      latitude: 25.7868,
      longitude: -80.1304,
    },
    features: [
      "Partial Ocean View",
      "Modern Design",
      "Stainless Steel Appliances",
      "Quartz Countertops",
      "Porcelain Tile Floors",
      "Walk-in Closet",
      "Balcony",
      "Rooftop Pool",
      "Fitness Center",
      "24-Hour Security",
    ],
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    agent: {
      id: "agent4",
      name: "Sarah Johnson",
      phone: "(305) 555-1234",
      email: "sarah@miamiluxuryestates.com",
      photo: "/placeholder.svg?height=200&width=200",
    },
    createdAt: "2023-12-05T16:15:00Z",
  },
]

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Get all properties
export const getProperties = async (): Promise<Property[]> => {
  await delay(800) // Simulate network delay
  return [...mockProperties]
}

// Get property by ID
export const getPropertyById = async (id: string): Promise<Property> => {
  await delay(500) // Simulate network delay
  const property = mockProperties.find((p) => p.id === id)

  if (!property) {
    throw new Error(`Property with ID ${id} not found`)
  }

  return { ...property }
}

// Add a new property
export const addProperty = async (property: Omit<Property, "id" | "createdAt">): Promise<Property> => {
  await delay(1000) // Simulate network delay

  const newProperty: Property = {
    id: generateId(),
    createdAt: new Date().toISOString(),
    ...property,
  }

  mockProperties.unshift(newProperty)
  return newProperty
}

// Update a property
export const updateProperty = async (id: string, updates: Partial<Property>): Promise<Property> => {
  await delay(1000) // Simulate network delay

  const index = mockProperties.findIndex((p) => p.id === id)

  if (index === -1) {
    throw new Error(`Property with ID ${id} not found`)
  }

  const updatedProperty = {
    ...mockProperties[index],
    ...updates,
  }

  mockProperties[index] = updatedProperty
  return updatedProperty
}

// Delete a property
export const deleteProperty = async (id: string): Promise<void> => {
  await delay(800) // Simulate network delay

  const index = mockProperties.findIndex((p) => p.id === id)

  if (index === -1) {
    throw new Error(`Property with ID ${id} not found`)
  }

  mockProperties.splice(index, 1)
}
