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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { useWallet } from '@/components/wallet-provider'
import { ConnectWalletButton } from '@/components/connect-wallet-button'

export default function FunderSignup() {
  const router = useRouter()
  const { isConnected } = useWallet()
  const [currentStep, setCurrentStep] = useState(isConnected ? 1 : 0)
  const [organizationType, setOrganizationType] = useState('foundation')

  const handleCreateProfile = () => {
    router.push('/funder/dashboard')
  }

  return (
    <div className="container max-w-4xl mx-auto px-4 py-12">
      <div className="flex flex-col items-center space-y-6 text-center mb-8">
        <h1 className="text-3xl font-bold">Join as a Funding Organization</h1>
        <p className="text-muted-foreground max-w-[600px]">
          Create your funder profile to discover and support innovative research projects.
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
        </div>
      </div>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>
            {currentStep === 0 && 'Connect Your Wallet'}
            {currentStep === 1 && 'Create Your Funder Profile'}
          </CardTitle>
          <CardDescription>
            {currentStep === 0 && 'Connect your wallet to get started with the platform'}
            {currentStep === 1 && 'Set up your organization profile with funding preferences'}
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
              <Tabs defaultValue="organization">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="organization">Organization</TabsTrigger>
                  <TabsTrigger value="funding">Funding Preferences</TabsTrigger>
                  <TabsTrigger value="verification">Verification</TabsTrigger>
                </TabsList>
                <TabsContent value="organization" className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="org-name">Organization Name</Label>
                    <Input id="org-name" placeholder="Research Foundation" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="org-type">Organization Type</Label>
                    <RadioGroup value={organizationType} onValueChange={setOrganizationType}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="foundation" id="foundation" />
                        <Label htmlFor="foundation">Foundation</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="university" id="university" />
                        <Label htmlFor="university">University</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="government" id="government" />
                        <Label htmlFor="government">Government Agency</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="corporate" id="corporate" />
                        <Label htmlFor="corporate">Corporate</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input id="website" placeholder="https://example.org" />
                  </div>
                </TabsContent>
                <TabsContent value="funding" className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="research-areas">Research Areas of Interest</Label>
                    <Input
                      id="research-areas"
                      placeholder="AI, Quantum Computing, Climate Science"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="funding-range">Typical Funding Range</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <Input id="funding-min" placeholder="Min (USDC)" />
                      <Input id="funding-max" placeholder="Max (USDC)" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="funding-criteria">Funding Criteria</Label>
                    <Textarea
                      id="funding-criteria"
                      placeholder="Describe your organization's criteria for funding research projects"
                    />
                  </div>
                </TabsContent>
                <TabsContent value="verification" className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact-name">Primary Contact Name</Label>
                    <Input id="contact-name" placeholder="Jane Smith" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-email">Contact Email</Label>
                    <Input id="contact-email" type="email" placeholder="contact@foundation.org" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tax-id">Tax ID / Registration Number</Label>
                    <Input id="tax-id" placeholder="123456789" />
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
          {currentStep === 1 && <Button onClick={handleCreateProfile}>Create Profile</Button>}
        </CardFooter>
      </Card>
    </div>
  )
}
