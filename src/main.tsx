
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ClerkProvider } from '@clerk/clerk-react';
import App from './App';
import './index.css';

// Replace with your actual Clerk publishable key
// For development, we'll provide a placeholder key if the env variable is missing
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || "pk_test_placeholder_key_for_development";

// Only throw error in production environment
if (!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY && import.meta.env.PROD) {
  throw new Error("Missing Clerk Publishable Key");
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ClerkProvider 
      publishableKey={PUBLISHABLE_KEY}
      clerkJSVersion="5.56.0-snapshot.v20250312225817"
      signInUrl="/signin"
      signUpUrl="/signup"
      signInFallbackRedirectUrl="/profile"
      signUpFallbackRedirectUrl="/profile"
      afterSignOutUrl="/">
      <App />
    </ClerkProvider>
  </React.StrictMode>,
);
