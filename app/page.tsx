'use client'
import LoginButton from "@/components/LoginButton";
import { useOCAuth } from "@opencampus/ocid-connect-js";

export default function Home() {
  const { authState, ocAuth } = useOCAuth();
  console.log('authState', authState)

  if (authState?.error|| authState === undefined) {
    return <div>Error: </div>;
  }

  // Add a loading state
  if ( authState && authState.isLoading) {
    return <div>Loading...</div>;
  }


  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div>
      <h1>Welcome to My App</h1>
      {authState?.isAuthenticated ? (
        <p>You are logged in! {JSON.stringify(ocAuth.getAuthState())}</p>
        
      ) : (
        <LoginButton />
      )}
    </div>
    </div>
  );
}
