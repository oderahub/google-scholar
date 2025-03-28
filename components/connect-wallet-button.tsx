'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { useWallet } from '../components/'
import { Loader2, LogOut, Wallet } from 'lucide-react'

export function ConnectWalletButton() {
  const { isConnected, address, connect, disconnect } = useWallet()
  const [isConnecting, setIsConnecting] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const handleConnect = async () => {
    setIsConnecting(true)
    try {
      await connect()
      setIsOpen(false)
    } catch (error) {
      console.error('Failed to connect wallet:', error)
    } finally {
      setIsConnecting(false)
    }
  }

  const handleDisconnect = () => {
    disconnect()
  }

  if (isConnected) {
    return (
      <Button
        variant="outline"
        onClick={handleDisconnect}
        className="flex items-center gap-2 border-primary/20 bg-primary/5 hover:bg-primary/10"
      >
        <span className="hidden md:inline-block">
          {address?.slice(0, 6)}...{address?.slice(-4)}
        </span>
        <span className="md:hidden">Wallet</span>
        <LogOut className="h-4 w-4" />
      </Button>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 border-primary/20 bg-primary/5 hover:bg-primary/10"
        >
          <Wallet className="h-4 w-4" />
          <span>Connect Wallet</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md border-primary/20 bg-background/95 backdrop-blur-md">
        <DialogHeader>
          <DialogTitle className="font-heading">Connect your wallet</DialogTitle>
          <DialogDescription>
            Connect your wallet to access the decentralized research funding platform.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Button
            onClick={handleConnect}
            disabled={isConnecting}
            className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary border-0"
          >
            {isConnecting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <Wallet className="mr-2 h-4 w-4" />
                Connect with MetaMask
              </>
            )}
          </Button>
          <Button
            variant="outline"
            onClick={handleConnect}
            disabled={isConnecting}
            className="w-full border-primary/20 bg-primary/5 hover:bg-primary/10"
          >
            {isConnecting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Connecting...
              </>
            ) : (
              'Connect with WalletConnect'
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
