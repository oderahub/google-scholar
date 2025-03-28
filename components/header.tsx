'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { Menu } from 'lucide-react'
import { useWallet } from '@/components/wallet-provider'
import { ConnectWalletButton } from '@/components/connect-wallet-button'
import { motion } from 'framer-motion'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { isConnected, address } = useWallet()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const routes = [
    {
      title: 'Home',
      href: '/'
    },
    {
      title: 'For Researchers',
      href: '/researcher',
      children: [
        {
          title: 'Create Profile',
          href: '/researcher/profile',
          description: 'Build your academic profile with verified credentials'
        },
        {
          title: 'Submit Proposal',
          href: '/researcher/proposal',
          description: 'Create and submit your research funding proposal'
        },
        {
          title: 'My Projects',
          href: '/researcher/projects',
          description: 'Manage your ongoing and past research projects'
        }
      ]
    },
    {
      title: 'For Funders',
      href: '/funder',
      children: [
        {
          title: 'Browse Projects',
          href: '/funder/browse',
          description: 'Discover promising research projects to fund'
        },
        {
          title: 'My Investments',
          href: '/funder/investments',
          description: 'Track your research investments and outcomes'
        },
        {
          title: 'Due Diligence',
          href: '/funder/due-diligence',
          description: 'Verify researcher credentials and project viability'
        }
      ]
    },
    {
      title: 'Explore',
      href: '/explore'
    },
    {
      title: 'About',
      href: '/about'
    }
  ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        'sticky top-0 z-40 w-full transition-all duration-300',
        scrolled
          ? 'bg-background/80 backdrop-blur-md border-b border-primary/10 shadow-sm'
          : 'bg-transparent'
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl font-heading bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              Google Scholar
            </span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <NavigationMenu>
              <NavigationMenuList>
                {routes.map((route) =>
                  route.children ? (
                    <NavigationMenuItem key={route.href}>
                      <NavigationMenuTrigger
                        className={cn(
                          'h-auto bg-transparent',
                          pathname.startsWith(route.href) && 'text-primary font-medium'
                        )}
                      >
                        {route.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                          {route.children.map((child) => (
                            <li key={child.href}>
                              <NavigationMenuLink asChild>
                                <Link
                                  href={child.href}
                                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary"
                                >
                                  <div className="text-sm font-medium leading-none">
                                    {child.title}
                                  </div>
                                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                    {child.description}
                                  </p>
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  ) : (
                    <NavigationMenuItem key={route.href}>
                      <Link href={route.href} legacyBehavior passHref>
                        <NavigationMenuLink
                          className={cn(
                            navigationMenuTriggerStyle(),
                            'h-auto bg-transparent',
                            pathname === route.href && 'text-primary font-medium'
                          )}
                        >
                          {route.title}
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  )
                )}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <ConnectWalletButton />
          {isConnected && (
            <Link href="/dashboard">
              <Button
                variant="outline"
                className="border-primary/20 bg-primary/5 hover:bg-primary/10"
              >
                Dashboard
              </Button>
            </Link>
          )}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 border-primary/20 bg-primary/5"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="pr-0 border-primary/20 bg-background/95 backdrop-blur-md"
            >
              <div className="px-7">
                <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                  <span className="font-bold font-heading">Google Scholar</span>
                </Link>
              </div>
              <nav className="flex flex-col gap-4 px-7 mt-8">
                {routes.map((route) => (
                  <div key={route.href} className="flex flex-col gap-2">
                    <Link
                      href={route.href}
                      className={cn(
                        'text-lg font-medium',
                        pathname === route.href && 'text-primary'
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      {route.title}
                    </Link>
                    {route.children && (
                      <div className="ml-4 flex flex-col gap-2">
                        {route.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={cn('text-sm', pathname === child.href && 'text-primary')}
                            onClick={() => setIsOpen(false)}
                          >
                            {child.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  )
}
