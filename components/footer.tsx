import Link from "next/link"
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t bg-card/40">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 font-bold text-xl mb-4">
              <span className="text-primary">DAYANNE COSTA</span>
              <span className="text-sm text-muted-foreground">COMPASS</span>
            </Link>
            <p className="text-muted-foreground mb-4">
              Your trusted partner in finding the perfect property in Miami's most desirable neighborhoods.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="w-5 h-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="w-5 h-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="w-5 h-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Linkedin className="w-5 h-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/properties" className="text-muted-foreground hover:text-primary">
                  Properties
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Property Types</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/properties?type=house" className="text-muted-foreground hover:text-primary">
                  Houses
                </Link>
              </li>
              <li>
                <Link href="/properties?type=apartment" className="text-muted-foreground hover:text-primary">
                  Apartments
                </Link>
              </li>
              <li>
                <Link href="/properties?type=condo" className="text-muted-foreground hover:text-primary">
                  Condos
                </Link>
              </li>
              <li>
                <Link href="/properties?type=villa" className="text-muted-foreground hover:text-primary">
                  Villas
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-muted-foreground">
                  2550 South Bayshore Drive, Suite 106
                  <br />
                  Miami, FL 33133
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span className="text-muted-foreground">+1 (646) 598-3588</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span className="text-muted-foreground">dayannecosta@compass.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Dayanne Costa. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-primary">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-primary">
              Accessibility
            </Link>
          </div>
        </div>

        <div className="mt-6 text-xs text-muted-foreground text-center">
          <p>
            Dayanne Costa is a real estate agent affiliated with Compass. Compass is a licensed real estate broker. All
            information presented herein is intended for informational purposes only. Information is compiled from
            sources deemed reliable but is subject to errors, omissions, changes in price, condition, sale, or
            withdrawal without notice. All measurements and square footages are approximate. This is not intended to
            solicit properties already listed. Nothing herein shall be construed as legal, accounting or other
            professional advice outside the realm of real estate brokerage. Equal Housing Opportunity.
          </p>
        </div>
      </div>
    </footer>
  )
}
