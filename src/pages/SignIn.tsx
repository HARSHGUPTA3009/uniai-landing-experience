import React, { useState } from 'react';
import { SignIn } from '@clerk/clerk-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const SignInPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-12 flex items-center justify-center">
        <div className="container mx-auto max-w-md px-4">
          <div className="glass-morphism p-1.5 rounded-2xl text-center">
            <h1 className="text-3xl font-bold text-gradient-primary mb-4">Welcome Back</h1>
            <p className="text-muted-foreground mb-6">Sign in to your account</p>
            <SignIn path="/signin" routing="path" redirectUrl="/profile" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SignInPage;
