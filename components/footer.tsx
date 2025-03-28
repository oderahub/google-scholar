import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Github, Linkedin, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-primary/10 bg-background/50 backdrop-blur-sm">
      <div className="container px-4 py-12 md:py-16 lg:py-20">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-bold font-heading bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              Google Scholar
            </h3>
            <p className="text-sm text-muted-foreground">
              Decentralized Research Funding Platform connecting researchers with funding
              organizations through blockchain technology.
            </p>
            <div className="flex gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-primary/10 hover:text-primary"
                asChild
              >
                <Link href="https://twitter.com" target="_blank" rel="noreferrer">
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-primary/10 hover:text-primary"
                asChild
              >
                <Link href="https://github.com" target="_blank" rel="noreferrer">
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-primary/10 hover:text-primary"
                asChild
              >
                <Link href="https://linkedin.com" target="_blank" rel="noreferrer">
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </Button>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold font-heading">For Researchers</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/researcher/profile"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Create Profile
                </Link>
              </li>
              <li>
                <Link
                  href="/researcher/proposal"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Submit Proposal
                </Link>
              </li>
              <li>
                <Link
                  href="/researcher/projects"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Manage Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/researcher/funding"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Funding Options
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold font-heading">For Funders</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/funder/browse"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Browse Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/funder/investments"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Track Investments
                </Link>
              </li>
              <li>
                <Link
                  href="/funder/due-diligence"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Due Diligence
                </Link>
              </li>
              <li>
                <Link
                  href="/funder/impact"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Impact Metrics
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold font-heading">Stay Updated</h3>
            <p className="text-sm text-muted-foreground">
              Subscribe to our newsletter for the latest updates on research projects and funding
              opportunities.
            </p>
            <div className="flex gap-2">
              <Input
                placeholder="Enter your email"
                type="email"
                className="max-w-[220px] bg-background/50 border-primary/20 focus-visible:ring-primary"
              />
              <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary border-0">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-primary/10 pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Google Scholar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
