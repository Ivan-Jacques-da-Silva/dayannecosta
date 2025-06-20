// Este arquivo centraliza todas as funções de leitura/escrita de dados.
// Mesmo usando dados fake, todas as operações devem passar por aqui.

// Dados fake para simular o backend
const properties = [
  {
    id: "prop1",
    propertyTitle: "475 Brickell Ave #4713 Miami, FL 33131",
    price: 999000,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1234,
    address: "475 Brickell Ave #4713, Miami, FL 33131",
    description:
      "Stunning 2 bed, 2 bath condo in the heart of Brickell with breathtaking views of Biscayne Bay and the Miami skyline. This luxury unit features floor-to-ceiling windows, a gourmet kitchen with stainless steel appliances, and a spacious balcony perfect for entertaining. The Icon Brickell offers world-class amenities including a two-acre pool deck, state-of-the-art fitness center, and 24-hour concierge service. Walking distance to Brickell City Centre, restaurants, and nightlife.",
    images: [
      "/img/A11680845_1.jpeg",
      "/img/A11680845_1.jpeg",
      "/img/A11680845_1.jpeg",
    ],
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    realtorName: "Jane Smith",
    realtorEmail: "jane.smith@realestate.com",
    realtorPhone: "(305) 555-1234",
    map: {
      latitude: 25.7689,
      longitude: -80.1896,
    },
    // Campos extras
    hoa: 950,
    taxes: 12000,
    yearBuilt: 2008,
    garage: 1,
    status: "available", // available, sold, reserved
    highlighted: true,
  },
  {
    id: "prop2",
    propertyTitle: "1000 S Miami Ave #2104 Miami, FL 33130",
    price: 1250000,
    bedrooms: 3,
    bathrooms: 2.5,
    sqft: 1850,
    address: "1000 S Miami Ave #2104, Miami, FL 33130",
    description:
      "Luxurious 3 bedroom condo in the prestigious 1000 Museum building designed by Zaha Hadid. Enjoy panoramic views of Biscayne Bay and Miami's skyline from this high-floor unit featuring premium finishes, smart home technology, and European appliances. Building amenities include a helipad, sky lounge, aquatic center, and private security.",
    images: [
      "/img/A11618502_1.jpeg",
      "/img/A11618502_1.jpeg",
      "/img/A11618502_1.jpeg",
    ],
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    realtorName: "John Davis",
    realtorEmail: "john.davis@realestate.com",
    realtorPhone: "(305) 555-5678",
    map: {
      latitude: 25.765,
      longitude: -80.1936,
    },
    hoa: 1200,
    taxes: 18000,
    yearBuilt: 2019,
    garage: 2,
    status: "available",
    highlighted: true,
  },
  {
    id: "prop3",
    propertyTitle: "2000 Bay Dr #801 Miami Beach, FL 33141",
    price: 750000,
    bedrooms: 1,
    bathrooms: 1.5,
    sqft: 980,
    address: "2000 Bay Dr #801, Miami Beach, FL 33141",
    description:
      "Modern 1-bedroom luxury condo with stunning bay views in North Bay Village. Features contemporary finishes, floor-to-ceiling windows, and a private balcony overlooking Biscayne Bay. The building offers resort-style amenities including infinity pool, fitness center, and rooftop terrace. Just minutes from South Beach and Downtown Miami.",
    images: [
      "/img/A11686212_1.jpeg",
      "/img/A11686212_1.jpeg",
      "/img/A11686212_1.jpeg",
    ],
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    realtorName: "Carlos Rodriguez",
    realtorEmail: "carlos.rodriguez@realestate.com",
    realtorPhone: "(305) 555-9876",
    map: {
      latitude: 25.8267,
      longitude: -80.1918,
    },
    hoa: 650,
    taxes: 8500,
    yearBuilt: 2018,
    garage: 1,
    status: "available",
    highlighted: false,
  },
  {
    id: "prop4",
    propertyTitle: "3456 Main Highway Coconut Grove, FL 33133",
    price: 2750000,
    bedrooms: 4,
    bathrooms: 3.5,
    sqft: 3200,
    address: "3456 Main Highway, Coconut Grove, FL 33133",
    description:
      "Stunning waterfront single-family home in the heart of Coconut Grove. This elegant property features 4 spacious bedrooms, gourmet kitchen with marble countertops, and a private dock with bay access. Beautifully landscaped grounds with pool and outdoor entertainment area. Walking distance to CocoWalk and Grove restaurants.",
    images: [
      "/img/A11686212_1.jpeg",
      "/img/A11686212_1.jpeg",
      "/img/A11686212_1.jpeg",
    ],
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    realtorName: "Maria Santos",
    realtorEmail: "maria.santos@realestate.com",
    realtorPhone: "(305) 555-4321",
    map: {
      latitude: 25.7259,
      longitude: -80.2377,
    },
    hoa: 0,
    taxes: 32000,
    yearBuilt: 2015,
    garage: 2,
    status: "available",
    highlighted: true,
  },
  {
    id: "prop5",
    propertyTitle: "789 Ocean Dr #PH1 South Beach, FL 33139",
    price: 5200000,
    bedrooms: 3,
    bathrooms: 3,
    sqft: 2800,
    address: "789 Ocean Dr #PH1, South Beach, FL 33139",
    description:
      "Exclusive penthouse on iconic Ocean Drive with unobstructed ocean views. This luxury residence features 3 bedrooms, private rooftop terrace, and premium finishes throughout. Located in the heart of South Beach's Art Deco District, steps from world-class dining and nightlife. Building amenities include valet, concierge, and beach service.",
    images: [
      "/img/A11713458_1.jpeg",
      "/img/A11713458_1.jpeg",
      "/img/A11713458_1.jpeg",
      "/img/A11713458_1.jpeg",
      "/img/A11713458_1.jpeg",
    ],
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    realtorName: "Alexandra Chen",
    realtorEmail: "alexandra.chen@realestate.com",
    realtorPhone: "(305) 555-7890",
    map: {
      latitude: 25.7814,
      longitude: -80.1300,
    },
    hoa: 2500,
    taxes: 65000,
    yearBuilt: 2020,
    garage: 2,
    status: "available",
    highlighted: true,
  },
  {
    id: "prop6",
    propertyTitle: "1234 Coral Way #15B Coral Gables, FL 33134",
    price: 450000,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1100,
    address: "1234 Coral Way #15B, Coral Gables, FL 33134",
    description:
      "Charming 2-bedroom condo in the prestigious Coral Gables area. Recently renovated with modern kitchen, updated bathrooms, and hardwood floors throughout. Building features pool, gym, and 24-hour security. Close to Miracle Mile shopping and dining, University of Miami, and excellent schools.",
    images: [
      "/img/A11713458_1.jpeg",
      "/img/A11713458_1.jpeg",
      "/img/A11713458_1.jpeg",
    ],
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    realtorName: "Roberto Silva",
    realtorEmail: "roberto.silva@realestate.com",
    realtorPhone: "(305) 555-2468",
    map: {
      latitude: 25.7463,
      longitude: -80.2581,
    },
    hoa: 450,
    taxes: 5500,
    yearBuilt: 1985,
    garage: 1,
    status: "sold",
    highlighted: false,
  },
  {
    id: "prop7",
    propertyTitle: "567 NE 15th St #12A Downtown Miami, FL 33132",
    price: 680000,
    bedrooms: 1,
    bathrooms: 1,
    sqft: 850,
    address: "567 NE 15th St #12A, Downtown Miami, FL 33132",
    description:
      "Contemporary 1-bedroom loft in the vibrant downtown district. Features exposed brick walls, high ceilings, and floor-to-ceiling windows with city views. Modern kitchen with stainless steel appliances and granite countertops. Building amenities include rooftop pool, fitness center, and business center. Walking distance to Metrorail and Metromover.",
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    realtorName: "Jennifer Williams",
    realtorEmail: "jennifer.williams@realestate.com",
    realtorPhone: "(305) 555-1357",
    map: {
      latitude: 25.7889,
      longitude: -80.1916,
    },
    hoa: 550,
    taxes: 7200,
    yearBuilt: 2012,
    garage: 1,
    status: "reserved",
    highlighted: false,
  },
]

/**
 * Retorna todos os imóveis
 * @returns {Array} Lista de imóveis
 */
export const getAllProperties = () => {
  return [...properties]
}

/**
 * Busca um imóvel pelo ID
 * @param {string} id - ID do imóvel
 * @returns {Object|null} Imóvel encontrado ou null
 */
export const getPropertyById = (id) => {
  const property = properties.find((prop) => prop.id === id)
  return property ? { ...property } : null
}

/**
 * Salva um novo imóvel
 * @param {Object} property - Dados do imóvel
 * @returns {Object} Imóvel salvo com ID gerado
 */
export const saveProperty = (property) => {
  const newProperty = {
    ...property,
    id: `prop${properties.length + 1}`,
    createdAt: new Date().toISOString(),
  }

  properties.push(newProperty)
  return { ...newProperty }
}

/**
 * Atualiza um imóvel existente
 * @param {string} id - ID do imóvel
 * @param {Object} updates - Campos a serem atualizados
 * @returns {Object|null} Imóvel atualizado ou null
 */
export const updateProperty = (id, updates) => {
  const index = properties.findIndex((prop) => prop.id === id)

  if (index === -1) return null

  properties[index] = {
    ...properties[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  }

  return { ...properties[index] }
}

/**
 * Remove um imóvel
 * @param {string} id - ID do imóvel
 * @returns {boolean} Sucesso da operação
 */
export const deleteProperty = (id) => {
  const index = properties.findIndex((prop) => prop.id === id)

  if (index === -1) return false

  properties.splice(index, 1)
  return true
}

/**
 * Retorna imóveis em destaque
 * @returns {Array} Lista de imóveis destacados
 */
export const getHighlightedProperties = () => {
  return properties.filter((prop) => prop.highlighted)
}

/**
 * Filtra imóveis por critérios
 * @param {Object} filters - Critérios de filtragem
 * @returns {Array} Lista de imóveis filtrados
 */
export const filterProperties = (filters = {}) => {
  return properties.filter((property) => {
    let match = true

    if (filters.minPrice && property.price < filters.minPrice) match = false
    if (filters.maxPrice && property.price > filters.maxPrice) match = false
    if (filters.bedrooms && property.bedrooms < filters.bedrooms) match = false
    if (filters.bathrooms && property.bathrooms < filters.bathrooms) match = false
    if (filters.status && property.status !== filters.status) match = false

    return match
  })
}
