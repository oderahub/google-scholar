
# How to Setup Your Campus ID

**Important Note:** The OpenCampus ID SDK (`@opencampus/ocid-connect-js`) is currently **not compatible with React 19**. Please ensure you are using React 18.

[NPM Package Link](https://www.npmjs.com/package/@opencampus/ocid-connect-js)

## Working with Vite

1.  **Create a new Vite React project:**

    ```bash
    npm create vite@latest my-react-app -- --template react
    ```

2.  **Navigate to the project directory:**

    ```bash
    cd my-react-app
    ```

3.  **Install specific React 18 dependencies:**

    ```bash
    npm install react@18 react-dom@18
    ```

4.  **Start the development server:**

    ```bash
    npm run dev
    ```

## Working with Next.js

1.  **Create a Next.js project:**

    ```bash
    npx create-next-app@latest my-nextjs-app
    ```

2.  **Navigate to the project directory:**

    ```bash
    cd my-nextjs-app
    ```

3.  **Uninstall existing React packages:**

    ```bash
    npm uninstall react react-dom
    ```

4.  **Install specific React 18 versions:**

    ```bash
    npm install react@18.2.0 react-dom@18.2.0
    ```

## Installing OpenCampus ID SDK

```bash
npm i @opencampus/ocid-connect-js
```

## Implementation Steps

1.  **Open your application and create a wrapper context.**

    **Sample `OCConnectWrapper.tsx` (or `.jsx`):**

    ```typescript
    'use client';
    import { OCConnect } from '@opencampus/ocid-connect-js';
    import React from 'react';

    interface OCConnectWrapperProps {
        children: React.ReactNode;
        sandboxMode?: boolean; // Optional boolean
    }

    export default function OCConnectWrapper({ children, sandboxMode }: OCConnectWrapperProps) {
        const opts = {
            redirectUri: 'http://localhost:3000/redirect', // IMPORTANT: Update this!
        };
        return (
            <OCConnect opts={opts} sandboxMode={sandboxMode}>
                {children}
            </OCConnect>
        );
    }
    ```

    **Important:** Remember to replace `http://localhost:3000/redirect` with the actual redirect URI corresponding to where your application is served. This is the URL the OpenCampus ID service will redirect the user back to after authentication.

2.  **Add the context to your root layout.**

    In Next.js, you typically add context providers in your `layout.tsx` (or `layout.jsx`) file located in the `app` directory. This ensures the context is available throughout your application.

    **Example `app/layout.tsx`:**

    ```typescript
    import type { Metadata } from 'next';
    import { Inter } from 'next/font/google';
    import './globals.css';
    import OCConnectWrapper from '../components/OCConnectWrapper'; // Adjust path as needed

    const inter = Inter({ subsets: ['latin'] });

    export const metadata: Metadata = {
        title: 'My Campus App',
        description: 'App using OpenCampus ID',
    };

    export default function RootLayout({ children }: { children: React.ReactNode }) {
        return (
            <html lang="en">
                <body className={inter.className}>
                    <OCConnectWrapper sandboxMode={true}> {/* or false for production */}
                        {children}
                    </OCConnectWrapper>
                </body>
            </html>
        );
    }
    ```

    **Explanation:**

    * We import the `OCConnectWrapper` component.
    * We wrap the `children` prop (which represents the rest of your application) with the `OCConnectWrapper` component.
    * We set `sandboxMode` to `true` for development/testing or `false` for production.

    **Note:** Adjust the import path for `OCConnectWrapper` based on where you placed the component in your project.


##Final 



https://github.com/user-attachments/assets/2b4a0d6c-c04a-4852-a195-08e9784fd5e8

First hackerton by hackquest via educhain

