
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useAuth } from "@/context/auth-context"
import { Heart, LogOut, Menu, User, UserCog } from "lucide-react"
import { ModeToggle } from "./mode-toggle"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/properties", label: "Search Properties" },
  { href: "/buy-sell", label: "Buy/Sell" },
  { href: "/about", label: "Advantages" },
  { href: "/contact", label: "About" },
]

export default function Navbar() {
  const pathname = usePathname()
  const { user, logout, isAdmin } = useAuth()
  const [scrolled, setScrolled] = useState(false)
  const router = useRouter()

  const isAdminPage = pathname?.startsWith("/admin")
  const isDashboardPage = pathname?.startsWith("/dashboard")

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled || isAdminPage || isDashboardPage ? "bg-background/80 backdrop-blur-md border-b" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <span className="text-primary">DAYANNE COSTA</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === link.href ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center text-sm text-muted-foreground mr-4">
              <span className="hidden lg:inline">dayanne.costa@compass.com</span>
              <span className="hidden lg:inline mx-2">|</span>
              <span>+1 (646) 598-3588</span>
            </div>

            <ModeToggle />

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <User className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem disabled>
                    <span>{user.name}</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {isAdmin ? (
                    <DropdownMenuItem asChild>
                      <Link href="/admin" className="flex items-center cursor-pointer">
                        <UserCog className="w-4 h-4 mr-2" />
                        Admin Dashboard
                      </Link>
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard" className="flex items-center cursor-pointer">
                        <User className="w-4 h-4 mr-2" />
                        My Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem asChild>
                    <Link href="/favorites" className="flex items-center cursor-pointer">
                      <Heart className="w-4 h-4 mr-2" />
                      Favorites
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild variant="ghost" size="sm">
                <Link href="/login">Login | Register</Link>
              </Button>
            )}

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="grid gap-6 py-6">
                  <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                    <span className="text-primary">DAYANNE COSTA</span>
                  </Link>
                  <nav className="grid gap-4">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`text-sm font-medium transition-colors hover:text-primary ${
                          pathname === link.href ? "text-primary" : "text-muted-foreground"
                        }`}
                      >
                        {link.label}
                      </Link>
                    ))}
                    {user && (
                      <>
                        {isAdmin ? (
                          <Link href="/admin" className="text-sm font-medium transition-colors hover:text-primary">
                            Admin Dashboard
                          </Link>
                        ) : (
                          <Link href="/dashboard" className="text-sm font-medium transition-colors hover:text-primary">
                            My Dashboard
                          </Link>
                        )}
                        <Link href="/favorites" className="text-sm font-medium transition-colors hover:text-primary">
                          Favorites
                        </Link>
                        <Button variant="ghost" className="justify-start p-0" onClick={handleLogout}>
                          <span className="text-sm font-medium transition-colors hover:text-primary">Logout</span>
                        </Button>
                      </>
                    )}
                  </nav>
                  <div className="text-sm text-muted-foreground">
                    <p>dayanne.costa@compass.com</p>
                    <p>+1 (646) 598-3588</p>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
