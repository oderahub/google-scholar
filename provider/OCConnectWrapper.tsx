'use client'
import { OCConnect} from '@opencampus/ocid-connect-js';

interface OCConnectWrapperProps {
  children: React.ReactNode;
  sandboxMode?: boolean; // Optional boolean
}

export default function OCConnectWrapper({ children, sandboxMode }: OCConnectWrapperProps ) {
  const opts = {
    redirectUri: 'http://localhost:3000/redirect',
  }
  return (
    <OCConnect opts={opts} sandboxMode={sandboxMode}>
      {children}
    </OCConnect>
  );
}