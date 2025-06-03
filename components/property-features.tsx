// Este componente exibe as características e amenidades do imóvel.
// Organiza as informações em uma grade visualmente atraente.

import { Check, Home, Calendar, DollarSign, Building } from "lucide-react"

interface PropertyFeaturesProps {
  bedrooms: number
  bathrooms: number
  sqft: number
  yearBuilt: number
  garage: number
  hoa: number
  taxes: number
  features?: string[]
}

export default function PropertyFeatures({
  bedrooms,
  bathrooms,
  sqft,
  yearBuilt,
  garage,
  hoa,
  taxes,
  features = [],
}: PropertyFeaturesProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-4">Property Details</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-muted/30 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Home className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">Bedrooms</span>
            </div>
            <p className="font-medium">{bedrooms}</p>
          </div>

          <div className="bg-muted/30 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Home className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">Bathrooms</span>
            </div>
            <p className="font-medium">{bathrooms}</p>
          </div>

          <div className="bg-muted/30 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Home className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">Square Feet</span>
            </div>
            <p className="font-medium">{sqft.toLocaleString()}</p>
          </div>

          <div className="bg-muted/30 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">Year Built</span>
            </div>
            <p className="font-medium">{yearBuilt}</p>
          </div>

          <div className="bg-muted/30 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Home className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">Garage</span>
            </div>
            <p className="font-medium">
              {garage} {garage === 1 ? "Space" : "Spaces"}
            </p>
          </div>

          <div className="bg-muted/30 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <DollarSign className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">HOA</span>
            </div>
            <p className="font-medium">${hoa}/month</p>
          </div>

          <div className="bg-muted/30 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <DollarSign className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">Taxes</span>
            </div>
            <p className="font-medium">${taxes.toLocaleString()}/year</p>
          </div>

          <div className="bg-muted/30 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Building className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">Property Type</span>
            </div>
            <p className="font-medium">Condominium</p>
          </div>
        </div>
      </div>

      {features.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Features & Amenities</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-3">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="bg-primary/10 p-1 rounded-full">
                  <Check className="w-4 h-4 text-primary" />
                </div>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
