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
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
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
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
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
