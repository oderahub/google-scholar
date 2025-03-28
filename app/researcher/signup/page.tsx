'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useWallet } from '@/components/wallet-provider'
import { ConnectWalletButton } from '@/components/connect-wallet-button'
import { CheckCircle2, Loader2 } from 'lucide-react'

export default function ResearcherSignup() {
  const router = useRouter()
  const { isConnected } = useWallet()
  const [currentStep, setCurrentStep] = useState(isConnected ? 1 : 0)
  const [isVerifying, setIsVerifying] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [email, setEmail] = useState('')

  const handleVerifyEmail = () => {
    if (!email || !email.includes('@') || !email.includes('.')) return

    setIsVerifying(true)
    // Simulate email verification
    setTimeout(() => {
      setIsVerifying(false)
      setIsVerified(true)
      setCurrentStep(2)
    }, 2000)
  }

  const handleCreateProfile = () => {
    router.push('/researcher/profile')
  }

  return (
    <div className="container max-w-4xl mx-auto px-4 py-12">
      <div className="flex flex-col items-center space-y-6 text-center mb-8">
        <h1 className="text-3xl font-bold">Join as a Researcher</h1>
        <p className="text-muted-foreground max-w-[600px]">
          Create your researcher profile to access funding opportunities and connect with funding
          organizations.
        </p>
      </div>

      <div className="flex justify-center mb-8">
        <div className="flex items-center">
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-full ${
              currentStep >= 0
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground'
            }`}
          >
            1
          </div>
          <div className={`w-16 h-1 ${currentStep >= 1 ? 'bg-primary' : 'bg-muted'}`}></div>
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-full ${
              currentStep >= 1
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground'
            }`}
          >
            2
          </div>
          <div className={`w-16 h-1 ${currentStep >= 2 ? 'bg-primary' : 'bg-muted'}`}></div>
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-full ${
              currentStep >= 2
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground'
            }`}
          >
            3
          </div>
        </div>
      </div>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>
            {currentStep === 0 && 'Connect Your Wallet'}
            {currentStep === 1 && 'Verify Your Academic Email'}
            {currentStep === 2 && 'Create Your Profile'}
          </CardTitle>
          <CardDescription>
            {currentStep === 0 && 'Connect your wallet to get started with the platform'}
            {currentStep === 1 &&
              'Verify your university email to confirm your academic credentials'}
            {currentStep === 2 && 'Set up your researcher profile with your academic information'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {currentStep === 0 && (
            <div className="flex flex-col items-center space-y-6 py-8">
              <div className="text-center space-y-2 mb-4">
                <p>Connect your wallet to securely authenticate with our platform.</p>
                <p className="text-sm text-muted-foreground">
                  We support MetaMask, WalletConnect, and other popular wallet providers.
                </p>
              </div>
              <ConnectWalletButton />
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <Label htmlFor="email">Academic Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.name@university.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <p className="text-sm text-muted-foreground">
                  Please use your university email address for verification.
                </p>
              </div>
              <Button
                onClick={handleVerifyEmail}
                disabled={isVerifying || isVerified || !email}
                className="w-full"
              >
                {isVerifying ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : isVerified ? (
                  <>
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Verified
                  </>
                ) : (
                  'Verify Email'
                )}
              </Button>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6 py-4">
              <Tabs defaultValue="basic">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="basic">Basic Info</TabsTrigger>
                  <TabsTrigger value="academic">Academic</TabsTrigger>
                  <TabsTrigger value="research">Research</TabsTrigger>
                </TabsList>
                <TabsContent value="basic" className="space-y-4 pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input id="first-name" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input id="last-name" placeholder="Doe" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title">Academic Title</Label>
                    <Input id="title" placeholder="Associate Professor" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="institution">Institution</Label>
                    <Input id="institution" placeholder="University of Technology" />
                  </div>
                </TabsContent>
                <TabsContent value="academic" className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="orcid">ORCID Identifier</Label>
                    <Input id="orcid" placeholder="0000-0000-0000-0000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input id="department" placeholder="Computer Science" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="degree">Highest Degree</Label>
                    <Input id="degree" placeholder="Ph.D. in Computer Science" />
                  </div>
                </TabsContent>
                <TabsContent value="research" className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="interests">Research Interests</Label>
                    <Input id="interests" placeholder="Quantum Computing, AI, Machine Learning" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="publications">Number of Publications</Label>
                    <Input id="publications" type="number" placeholder="15" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="h-index">H-index</Label>
                    <Input id="h-index" type="number" placeholder="10" />
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {currentStep > 0 && (
            <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)}>
              Back
            </Button>
          )}
          {currentStep === 0 && (
            <Button variant="outline" asChild className="ml-auto">
              <Link href="/">Cancel</Link>
            </Button>
          )}
          {currentStep === 2 && <Button onClick={handleCreateProfile}>Create Profile</Button>}
        </CardFooter>
      </Card>
    </div>
  )
}
