import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SignUp } from '@clerk/clerk-react';

const SignUpPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-12 flex items-center justify-center">
        <div className="container mx-auto max-w-md px-4">
          <div className="glass-morphism p-1.5 rounded-2xl">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-gradient-primary">Create Account</h1>
              <p className="text-muted-foreground mt-2">Join UniAI today</p>
            </div>

            
            <SignUp path="/signup" routing="path" redirectUrl="/profile" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SignUpPage;
